import useSWR from 'swr';
import configData from "../../config.json";
const  SERVER_URL = configData.SERVER_URL;

const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function Fetcher(endpoint) 
{
    const { data, error, isLoading } = useSWR(endpoint, fetcher,{ refreshInterval: 100})
    // console.log("k ", SERVER_URL+endpoint)
    // console.log("ppk ", data)

    return {
      data,
      isLoading,
      isError: error
    }
  
}
