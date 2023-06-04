export interface Device {
    friendly_name : string,
    ieee_address: string,
    interview_completed: boolean,
    interviewing: boolean,
    manufacturer: string,
    model_id: string,
    network_address: number,
    power_source : string,
    supported: boolean,
    type: string,
    status: DeviceStatus,
    definition: DeviceDefinition,
    endpoints: DeviceEndpoints
}

export interface Group{
    friendly_name: string
    id: number
    members: Device[]
    scenes: any
}


export interface Target{
    endpoint: number
    ieee_address: string
    type: string
}
export interface Bindings{
    cluster: any
    target: Target
}
export interface EndpointObject{
    bindings: Bindings[]
    clusters: any
}
export interface DeviceEndpoints{
    [endpoint: string]: EndpointObject
}


export type DeviceStatus = Record<string, any>

export type PowerSource = "Battery" | "Mains (single phase)" | "DC Source";

export type GenericFeatureType = "numeric" | "binary" | "enum" | "text" | "list";
export type CompositeFeatureType = "fan" | "light" | "switch" | "cover" | "lock" | "composite" | "climate";

export type Endpoint = string | number;

export enum FeatureAccessMode {
    NONE,
    ACCESS_UNKNOWN = 3,
    ACCESS_STATE = 1,
    ACCESS_WRITE = 2,
    ACCESS_READ = 5,
    ACCESS_WRITE_READ = 7,
}
export interface GenericExposedFeature {
    type: GenericFeatureType;
    name: string;
    unit?: "string";
    access: FeatureAccessMode;
    endpoint?: Endpoint;
    property: string;
    description?: string;
}

export interface BinaryFeature extends GenericExposedFeature {
    type: "binary";
    value_on: unknown;
    value_off: unknown;
    value_toggle?: unknown;
}

export interface ListFeature extends GenericExposedFeature {
    type: "list";
    // bad design descision
    item_type: "number" | GenericOrCompositeFeature;
}

export interface CompositeFeature extends Omit<GenericExposedFeature, "type"> {
    type: CompositeFeatureType;
    features: GenericOrCompositeFeature[];
}

export type GenericOrCompositeFeature = GenericExposedFeature | CompositeFeature;

export interface NumericFeaturePreset {
    name: string;
    value: number;
    description?: string;
}
export interface NumericFeature extends GenericExposedFeature {
    type: "numeric";
    value_min?: number;
    value_max?: number;
    value_step?: number;
    presets?: NumericFeaturePreset[];
}

export interface TextualFeature extends GenericExposedFeature {
    type: "text";
}

export interface EnumFeature extends GenericExposedFeature {
    type: "enum";
    values: unknown[];
}

export interface LightFeature extends CompositeFeature {
    type: "light";
}

export interface SwitchFeature extends CompositeFeature {
    type: "switch";
}

export interface CoverFeature extends CompositeFeature {
    type: "cover";
}

export interface LockFeature extends CompositeFeature {
    type: "lock";
}
export interface FanFeature extends CompositeFeature {
    type: "fan";
}

export interface ClimateFeature extends CompositeFeature {
    type: "climate";
}

export interface ColorFeature extends CompositeFeature {
    type: "composite";
    name: "color_xy" | "color_hs";
    features: NumericFeature[];
}


export interface DeviceDefinition {
    description: string;
    model: string;
    supports: string;
    vendor: string;
    exposes: GenericOrCompositeFeature[];
    options: GenericOrCompositeFeature[];
    supports_ota: boolean;
    icon?: string;
}
