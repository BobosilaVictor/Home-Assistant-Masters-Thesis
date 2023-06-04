import { GenericExposedFeature, CompositeFeature, BinaryFeature, ListFeature, NumericFeature, TextualFeature, EnumFeature, LightFeature, SwitchFeature, CoverFeature, LockFeature, FanFeature, ColorFeature, ClimateFeature, FeatureAccessMode } from "../../../models";

export function isFeatureAccessState(feature: FeatureAccessMode): feature is FeatureAccessMode {
  return feature === 1;
}
export function isFeatureAccessWrite(feature: FeatureAccessMode): feature is FeatureAccessMode {
  return feature === 2;
}
export function isFeatureAccessRead(feature: FeatureAccessMode): feature is FeatureAccessMode {
  return feature === 5;
}
export function isFeatureAccessWriteRead(feature: FeatureAccessMode): feature is FeatureAccessMode {
  return feature === 7;
}

export function isFeatureAccess(feature: FeatureAccessMode): feature is FeatureAccessMode{
  return feature === 3;
}

export function isGenericExposedFeature(feature: GenericExposedFeature | CompositeFeature): feature is GenericExposedFeature {
  return !feature.hasOwnProperty('features');
}

export function isBinaryFeature(feature: GenericExposedFeature | CompositeFeature): feature is BinaryFeature {
  return feature.type === "binary";
}

export function isListFeature(feature: GenericExposedFeature | CompositeFeature): feature is ListFeature {
  return feature.type === "list";
}

export function isNumericFeature(feature: GenericExposedFeature | CompositeFeature): feature is NumericFeature {
  return feature.type === "numeric";
}

export function isTextualFeature(feature: GenericExposedFeature | CompositeFeature): feature is TextualFeature {
  return feature.type === "text";
}

export function isEnumFeature(feature: GenericExposedFeature | CompositeFeature): feature is EnumFeature {
  return feature.type === "enum";
}

export function isLightFeature(feature: GenericExposedFeature | CompositeFeature): feature is LightFeature {
  return feature.type === "light";
}

export function isSwitchFeature(feature: GenericExposedFeature | CompositeFeature): feature is SwitchFeature {
  return feature.type === "switch";
}

export function isCoverFeature(feature: GenericExposedFeature | CompositeFeature): feature is CoverFeature {
  return feature.type === "cover";
}

export function isLockFeature(feature: GenericExposedFeature | CompositeFeature): feature is LockFeature {
  return feature.type === "lock";
}

export function isFanFeature(feature: GenericExposedFeature | CompositeFeature): feature is FanFeature {
    return feature.type === "fan";
  }

export function isCompositeFeature(feature: GenericExposedFeature | CompositeFeature): feature is CompositeFeature {
  return feature.type === "composite" && (feature.name !== "color_xy" && feature.name !== "color_hs");
}

export function isColorFeature(feature: GenericExposedFeature | CompositeFeature): feature is ColorFeature {
  return feature.type === "composite" && (feature.name === "color_xy" || feature.name === "color_hs");
}

export function isClimateFeature(feature: GenericExposedFeature | CompositeFeature): feature is ClimateFeature {
  return feature.type === "climate";
}