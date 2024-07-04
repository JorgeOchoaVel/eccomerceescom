import { createContext, useState, useEffect } from "react";

export const AdminAddressContext = createContext();

const AdminAddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      const accessToken = 'eyJraWQiOiJUYkYxUGM4ZTN5VWdcL2VjZUxXQ1NBd2lqbjV1YURtNDd6Zlh6YjNmVVl6UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNGE4ZDQxOC1lMGIxLTcwNjgtM2E5Yy04OWZkNzA4OTJiODkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90Y2x1VklPdHYiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0ZGhlZGRvbDdqMWgxMWlzcGRybmV0aGQzZyIsImV2ZW50X2lkIjoiYTAwMTBlYTktOWI2Ny00N2NkLWI5NGQtYWU0OTQ4MTE2ZjQ3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTk5OTM0MjUsImV4cCI6MTcyMDA3OTgyNSwiaWF0IjoxNzE5OTkzNDI1LCJqdGkiOiJmZTdjZjVlMy00Y2ZkLTQ4MjUtYTA1My02ODMxZmU3MmE2NWMiLCJ1c2VybmFtZSI6ImM0YThkNDE4LWUwYjEtNzA2OC0zYTljLTg5ZmQ3MDg5MmI4OSJ9.jdwz5FEMEOo2OrOSQro200w7HWqJQZQNcpxuOGrFVyWh4mAzQBuO-AXn2BaJ6c7qHBHC1K6NwLy5_abQgp16HWPC1IvTJrOEaKTRAR5LURNzMd0bT8_dujKOfQmHHraXoNZKMcPdBrfQ2rTRAOijb7aaS0bZMn8CdvL9AwlbxTSu1Np_S4-uMkpFnXOzTB-9QmLU878GviMLWNHQVS_eB214Jd1TPlkDzFB6OPsRwOqzx5uGJerGrEhR107N2IGhPJeZzJ_9fivRRyq7I-Ddi1lH-N4n_r-HmtlrcMl4rXDKhnBSEk6XLNDcgehBWd-iCvj4dPhLciJJh2D8fjixjw'; // Reemplaza con tu token de acceso real
      try {
        const response = await fetch("/api/dev/ecommerceEscom/address", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setAddresses(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  return (
    <AdminAddressContext.Provider value={{ addresses, loading, error }}>
      {children}
    </AdminAddressContext.Provider>
  );
};

export default AdminAddressProvider;
