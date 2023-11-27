import './SecurityDetail.scss';
import { Box, Button, Typography } from '@mui/material';
import { FieldSecurityDetailRows, Security } from '../../@types/SecurityTypes';
import { useEffect, useState } from 'react';
import { getSecurityDetail } from '../../utils/SecurityUtils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function SecurityDetail() {

  const navigate = useNavigate();
  const { ticker } = useParams();

  const [options, setOptions] = useState<any>();
  const [value, setValue] = useState<FieldSecurityDetailRows>({ country: '', id: 0, name: '', sector: '', ticker: '', trend: 0 });

  function setOptionsWithValues(value: Security) {
    const formattedData = value.prices.map(item => ({
      x: new Date(item.date).getTime(),
      close: parseFloat(item.close),
      volume: parseFloat(item.volume)
    }));
    
    setOptions({
      rangeSelector: { selected: 1 },
      title: { text: 'Security detail', align: 'left', x: 10, y: 15, style: {color: '#ffffff'}},
      scrollbar: { enabled: false },
      chart: {
        height: window.innerHeight - 70 + 'px',
        backgroundColor: '#2e3539',
        style: { color: '#ffffff' },
      },
      xAxis: { type: 'datetime', labels: { format: "{value:%b'%d}", style: { color: '#ffffff' } } },
      yAxis: [
        { 
          title: { text: 'Price', style: {color: '#a8a8a8'} },
          labels: { format: '{value:.0f}', style: {color: '#ffffff'} },
          lineWidth: 2
        }, 
        { 
          title: { text: 'Volume', style: {color: '#a8a8a8'} },
          opposite: true,
          labels: {
            formatter: function(): string {
              //@ts-ignore In this case is safe to ignore the this.value error
              return Highcharts.numberFormat(this.value / 1000000, 0) + 'M';
            },
            style: {color: '#ffffff'} 
          },
          lineWidth: 2 
        },
      ],
      series: [
        { 
          type: 'line',
          name: 'Price',
          data: formattedData.map(item => [item.x, item.close]),
          tooltip: { valueDecimals: 2 },
          marker: { enabled: false },
          yAxis: 0,
          color: '#309ad6',
          lineWidth: 4,
        },
        { 
          type: 'line', 
          name: 'Volume', 
          data: formattedData.map(item => [item.x, item.volume]), 
          tooltip: { valueDecimals: 0 }, 
          marker: { enabled: false },
          yAxis: 1 ,
          color: '#e55f63',
          lineWidth: 4,
        }
      ],
      legend: {
        itemStyle: {color: '#a8a8a8'},
        itemHoverStyle: { color: '#ffffff' }
      }
    });
  };

  function getSecurityDetailList() {
    getSecurityDetail(ticker + '')
      .then(res => res.json())
      .then((res: {Success: boolean, data: Security}) => {
        if(res.Success){
          setValue({
            id: 1,
            ticker: res.data.ticker,
            name: res.data.securityname,
            sector: res.data.sector,
            country: res.data.country,
            trend: res.data.trend,
          });
          setOptionsWithValues(res.data);
        } else {
          toast("Security detail not found");
          navigate('/');
        }
      })
      .catch((error) => {
        toast("Server failed");
        navigate('/');
      })
  }

  function backFunction() {
    navigate('/');
  }

  useEffect(() => {
    getSecurityDetailList();
  }, []);

  return(
      <Box id='security-detail'>
        
        <Button className='back-button' onClick={backFunction}>
          <Typography variant='h4'>back</Typography>
        </Button>

        <Box className='security-info'>
          <Typography className='security-info-ticker' variant='h4'> {`<symbol> - ${value.ticker}`} </Typography>
          <Typography variant='h4'> {`Sector: ${value.sector}` } </Typography>
          <Typography variant='h4'> {`Country: ${value.country}`} </Typography>
        </Box>

        <Box className='chart-container'>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </Box>
      </Box>
  )
}

export default SecurityDetail;