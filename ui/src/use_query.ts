import { useLocation } from 'umi';
export default function useQuery(param: string, val: any): any {
  const location: any = useLocation();
  const params = new URLSearchParams(location.search);
  return params.get(param) || val;
}
