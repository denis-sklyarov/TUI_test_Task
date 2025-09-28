//class to provide access to project config
export class Config{
    static getBaseUrl(): string {
        const envName = process.env.ENV;
        if (envName != undefined && envName != ""){
            return this.getEnvUrlByName(envName);
        }

        throw new Error(`Unknown env string: ${envName}`);
    }

    static getEnvUrlByName(envName:string): string {
        const url = process.env[`${envName}_URL`];
        if (url){
            return url;
        }

        throw new Error(`Cannot get url by ${envName} environment name`);
    }
}