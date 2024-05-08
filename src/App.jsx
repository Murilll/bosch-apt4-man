import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import { CardAPI } from './components/CardAPI'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'
import { Map } from './components/Map'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function App() {
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")
  const [name, setName] = useState("")

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


  const dados = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];


  const dados2 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  useEffect(() => {
    api.get(`/character/?page=${page}&name=${name}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        alert("Esta pagina nao contem este personagem")
        console.log("Esta pagina nao contem este personagem")
      }      
      console.error(error)
    })
  }, [page, name])

  return (
    <>
      <div className={style.wrapBtns}>
        <button onClick={() => setShow("prod")}>Produtos</button>
        <button onClick={() => setShow("api")}>API</button>
        <button onClick={() => setShow("map")}>Mapa</button>
        <button onClick={() => setShow("graphics")}>Graficos</button>

      </div>
      <div className={style.wrapPage}>
        <h1>Exercícios de manutenção</h1>
        {show === "prod" &&
          <>
            <div className={style.subtitle}>
              <h2>Showroom de produtos</h2>
              <div>
                <div className={style.display}>
                  <div className={style.lil_Ball}></div>
                  <h1>mostruario</h1>
                </div>
                <div className={style.display}>
                  <div className={style.lil_Ball_On}></div>
                  <h1>venda</h1>
                </div>
              </div>
            </div>
            <div className={style.Ctn_Card}>
              {produtos.map((item) => {
                return (
                  <Card name={item.name} desc={item.desc} value={item.value} image={item.image} key={item.id} status={item.status} category={item.categ} />
                )
              })}
            </div>
          </>
        }
        {show === "api" &&
          <>
            <h2>Rick and Morty API</h2>
            <div>
              <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)} />
            </div>
            <div>
              <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className={style.containerAPI}>
              {data.map((item) => {
                return (
                  <div key={item.id}>
                    <CardAPI name={item.name} status={item.status} species={item.species} type={item.type} gender={item.gender} image={item.image} />
                    {/* <button onClick={() => {}}>Info</button> */}
                  </div>
                )
              })}
            </div>
          </>
        }
        {show === "map" &&
          <>
            <h2>Mapa</h2>
            <div>
              <Map />
            </div>
          </>
        }
        {show == "graphics" &&
          <>
            <LineChart
              width={500}
              height={300}
              data={dados}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>

            <PieChart width={400} height={400}>
              <Pie
                data={dados2}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>

          </>
        }
      </div>
    </>
  )
}

export default App
