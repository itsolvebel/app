import {config} from "@/config";


type Fetcher = {
    get(resource: string): Promise<any>;
}


const Fetcher = (baseUrl: string): Fetcher => {

    const get = async (resource: string): Promise<any> => {
        resource = filterResourceString(resource);
        const response = await fetch(`${baseUrl}${resource}`, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error('Failed to fetch resource');
        }
        return response.json();
    };

    return {get}
}


const filterResourceString = (resource: string) => {
    if (resource.slice(0, 1) !== '/') {
        return `/${resource}`;
    }
    return resource;
}

const fetcher = Fetcher(config.BACKEND_URL)

export {fetcher};