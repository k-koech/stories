
import useSWR from 'swr';
import configData from "../../config.json";
const  SERVER_URL = configData.SERVER_URL;

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Fetcher(endpoint) 
{
    const { data, error, isLoading } = useSWR(SERVER_URL+endpoint, fetcher,{ refreshInterval: 1000 })

    return {
      data,
      isLoading,
      isError: error
    }
  
}
