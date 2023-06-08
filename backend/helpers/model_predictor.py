import tensorflow as tf
from .redis_device_getter import RedisGetter
import numpy as np
from tensorflow.keras.backend import square, mean
from sklearn.preprocessing import MinMaxScaler
import os

def loss_mse_warmup(y_true, y_pred):
    """
    Calculate the Mean Squared Error between y_true and y_pred,
    but ignore the beginning "warmup" part of the sequences.

    y_true is the desired output.
    y_pred is the model's output.
    """

    # The shape of both input tensors are:
    # [batch_size, sequence_length, num_y_signals].

    # Ignore the "warmup" parts of the sequences
    # by taking slices of the tensors.
    y_true_slice = y_true[:, 50:, :]
    y_pred_slice = y_pred[:, 50:, :]

    # These sliced tensors both have this shape:
    # [batch_size, sequence_length - warmup_steps, num_y_signals]

    # Calculat the Mean Squared Error and use it as loss.
    mse = mean(square(y_true_slice - y_pred_slice))

    return mse


class ModelPredictor:
    def __init__(self, device, key):
        self.data = RedisGetter(device, key).parse_range_data(
            resample_value='10T"', return_data_frame=True
        )

    def load_model(self, path):
        return tf.keras.models.load_model(
            os.path.abspath(path),
            custom_objects={"loss_mse_warmup": loss_mse_warmup},
        )

    def prepare_input_data(self, input_data):
        self.x_scaler = MinMaxScaler()
        data = self.x_scaler.fit_transform(input_data)
        return data

    def prepare_output_data(self, output_data):
        self.y_scaler = MinMaxScaler()
        self.y_scaler.fit_transform(output_data)

    def make_prediction(self):
        data = self.data

        data["Day"] = data.index.dayofyear
        data["Hour"] = data.index.hour
        input_data_keys = ["temperature", "Day", "Hour"]
        df_input = data[input_data_keys]
        df_output = data["temperature"].values.reshape(-1, 1)
        model = self.load_model("saved_model/lstm_model")

        scaled_input_data = self.prepare_input_data(df_input.values)
        self.prepare_output_data(df_output)

        scaled_input_data = np.expand_dims(scaled_input_data, axis=1)
        prediction = model.predict(scaled_input_data)
        prediction_rescaled = self.y_scaler.inverse_transform(prediction[:,0])[-1]

        return prediction_rescaled
