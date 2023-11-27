import './Security.scss';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { FieldSecurityRows, Security as SecurityType } from '../../@types/SecurityTypes';
import { getAllSecurities } from '../../utils/SecurityUtils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Security() {

  const navigate = useNavigate();

  const [securityDataRows, setSecurityDataRows] = useState<FieldSecurityRows[]>([]);
  const columns: GridColDef[] = [
    {
      field: 'ticker',
      headerName: 'Symbol',
      flex: 0.2,
      headerClassName: 'normal-header-cell',
      cellClassName: 'normal-cell'
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.4,
      headerClassName: 'normal-header-cell',
      cellClassName: 'normal-cell'
    },
    {
      field: 'sector',
      headerName: 'Sector',
      flex: 0.2,
      headerClassName: 'normal-header-cell',
      cellClassName: 'normal-cell'
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.1,
      headerClassName: 'normal-header-cell',
      cellClassName: 'normal-cell'
    },
    {
      field: 'trend',
      headerName: 'Trend',
      flex: 0.1,
      align: "right",
      headerClassName: 'trend-header-cell',
      cellClassName: 'trend-cell'
    },
  ];

  async function getAllSecuritiesList() {
    getAllSecurities()
      .then(res => res.json())
      .then((res: {Success: boolean, data: SecurityType[]}) => {
        if(res.Success){
          const values: FieldSecurityRows[] = res.data.map((item, index) => {
            
            return {
              id: index,
              ticker: item.ticker,
              name: item.securityname,
              sector: item.sector,
              country: item.country,
              trend: item.trend,
            }
          });
          setSecurityDataRows(values);
        } else {
          toast("Failed receiving api response");
        }
      })
      .catch((error) => {
        toast("Server failed");
      })
  }

  function handleDbClick(event: any) {    
    navigate(`/security/${event.row.ticker}`)
  }

  useEffect(() => {
    getAllSecuritiesList();
  }, []);

  return (
    <Box id='security'>
      <DataGrid
        className='custom-data-grid'
        rows={securityDataRows}
        columns={columns}
        columnBuffer={0}
        slots={{ toolbar: DataGridTitle }}
        disableColumnSelector={true}
        style={{ backgroundColor: '#2e3539', color: 'white', borderColor: '2e3539e0', border: 0 }}
        onCellDoubleClick={handleDbClick}
      />
    </Box>
  )
}

function DataGridTitle() {
  return (
    <Box className='data-grid-title'>
      <h3>Securities</h3>
    </Box>
  )
};

export default Security;