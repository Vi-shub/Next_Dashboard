import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import axios from 'axios';


const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
}).required();

export default function UserDetail() {
  const [utype, setutype] = useState('User');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3000/api/users",JSON.stringify(data))
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setutype(event.target.value as string);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-col-1 md:grid-col-3 gap-5">
          <div>
            <TextField fullWidth size="small" label="Name" {...register('name')} variant="outlined" />
            <p className='text-orange-600 ml-1 text-xs'>{errors.name?.message}</p>
          </div>
          <div>
            <TextField fullWidth size="small" label="Email" {...register('email')} variant="outlined" />
            <p>{errors.email?.message}</p>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={utype}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="mt-2 flex justify-end">
          <Button type="submit" variant="outlined" className="mb-2">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}
