

export interface IParametersResponse {
    version:            string;
    parameters:         any;
    aliases:            { [key: string]: string };
    categoryValues:     string[];
    colorKeywordValues: string[];
    fontValues:         string[];
}

export interface IParameters {
    key:               string;
    display_name:      string;
    category:          string;
    available_in:      string[];
    expects:           any;
    depends?:          string[];
    url?:              string;
    short_description: string;
    disallow_base64?:  boolean;
    default?:          boolean | number | string;
    aliases?:          string[];
}