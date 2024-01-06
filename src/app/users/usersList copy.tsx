import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import axios from 'axios';
//example data type
type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};



const UserList = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getdata();
    }
    , []);

    const getdata = () => {
        axios.get('http://localhost:3000/api/users')
        .then((response) => {
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
    }


  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 150,
      },
      {
        accessorKey: 'type', //normal accessorKey
        header: 'Type',
        size: 200,
      },
      
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, // data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });
  
  return (
    <>
      {!loading && <MaterialReactTable table={table} />}
    </>
  );
};

export default UserList;
