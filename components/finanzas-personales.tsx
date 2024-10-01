"use client"

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts'
import { Calendar as CalendarIcon, Moon, Sun, DollarSign, CreditCard, PiggyBank, Wallet, ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { ThemeProvider, useTheme } from './theme-provider'

// Datos de ejemplo (ampliados para incluir más transacciones y con formato de fecha y hora completo)
const data = {
"gastos_fijos": [
  { "id": "gf1", "categoria": "Luz", "presupuesto": 100.00, "gastos": [{ "fecha": "2023-01-15 08:30:00", "monto": 90.00 }] },
  { "id": "gf2", "categoria": "Agua", "presupuesto": 50.00, "gastos": [{ "fecha": "2023-01-10 10:15:30", "monto": 45.00 }] },
  { "id": "gf3", "categoria": "Gasto Comun", "presupuesto": 200.00, "gastos": [{ "fecha": "2023-01-05 14:45:20", "monto": 180.00 }] },
  { "id": "gf4", "categoria": "Internet", "presupuesto": 100.00, "gastos": [{ "fecha": "2023-01-20 09:00:00", "monto": 95.00 }] },
  { "id": "gf5", "categoria": "Celular", "presupuesto": 150.00, "gastos": [{ "fecha": "2023-01-25 11:30:45", "monto": 140.00 }] },
  { "id": "gf6", "categoria": "Gym", "presupuesto": 80.00, "gastos": [{ "fecha": "2023-01-30 18:20:10", "monto": 75.00 }] },
  { "id": "gf7", "categoria": "Arriendo", "presupuesto": 1000.00, "gastos": [{ "fecha": "2023-01-01 00:00:01", "monto": 950.00 }] }
],
"otros_gastos": [
  { "id": "og1", "nombre": "Compras de navidad", "fecha": "2022-12-15 15:30:00", "categoria": "Ocio", "monto": 200.00 },
  { "id": "og2", "nombre": "Viaje a la playa", "fecha": "2023-01-05 07:45:30", "categoria": "Vacaciones", "monto": 500.00 },
  { "id": "og3", "nombre": "Cena con amigos", "fecha": "2023-01-10 20:00:00", "categoria": "Restaurantes", "monto": 150.00 },
  { "id": "og4", "nombre": "Libros", "fecha": "2023-01-15 14:20:15", "categoria": "Educación", "monto": 80.00 },
  { "id": "og5", "nombre": "Concierto", "fecha": "2023-01-20 21:00:00", "categoria": "Entretenimiento", "monto": 120.00 },
  { "id": "og6", "nombre": "Ropa", "fecha": "2023-01-25 16:45:30", "categoria": "Compras", "monto": 250.00 },
  { "id": "og7", "nombre": "Reparación coche", "fecha": "2023-01-28 11:30:00", "categoria": "Transporte", "monto": 300.00 }
],
"ingresos": [
  { "id": "i1", "nombre": "Sueldo del mes", "fecha": "2023-01-15 00:00:01", "monto": 3000.00 },
  { "id": "i2", "nombre": "Bonus por cumplimiento de metas", "fecha": "2023-01-20 14:30:00", "monto": 1000.00 },
  { "id": "i3", "nombre": "Venta de artículos usados", "fecha": "2023-01-22 18:45:30", "monto": 150.00 }
],
"ahorros": [
  { "id": "a1", "fecha": "2023-01-01 09:00:00", "monto": 500.00 },
  { "id": "a2", "fecha": "2023-01-15 10:30:15", "monto": 1000.00 },
  { "id": "a3", "fecha": "2023-01-30 23:59:59", "monto": 300.00 }
]
}

const DatePickerWithRange = ({ date, setDate }) => {
return (
  <div className="grid gap-2">
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={`w-[300px] justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  </div>
)
}

// Nueva paleta de colores con mejor contraste
const colorPalette = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
  "#F7B801", "#7FDBDA", "#ADE498", "#DFAEB4", "#20639B",
  "#3CAEA3", "#F6D55C", "#ED553B", "#173F5F", "#20639B"
]

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function FinanzasPersonalesContent() {
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() })
  const [tipoTransaccion, setTipoTransaccion] = useState("")
  const [formData, setFormData] = useState({
    nombre: "",
    fecha: "",
    categoria: "",
    monto: ""
  })
  const [mesSeleccionado, setMesSeleccionado] = useState("todos")
  const [tipoTransaccionFiltro, setTipoTransaccionFiltro] = useState("todos")
  const [transaccionEditar, setTransaccionEditar] = useState(null)
  const [transaccionEliminar, setTransaccionEliminar] = useState(null)
  const [paginaActual, setPaginaActual] = useState(1)
  const [registrosPorPagina, setRegistrosPorPagina] = useState(10)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Datos de la transacción:", { tipo: tipoTransaccion, ...formData })
    // Aquí iría la lógica para guardar la transacción
  }

  // Función para obtener todas las transacciones
  const obtenerTodasLasTransacciones = () => {
    const gastosFijos = data.gastos_fijos.flatMap(gf => 
      gf.gastos.map(g => ({ ...g, id: `gf-${gf.id}-${g.fecha}`, tipo: 'Gasto Fijo', categoria: gf.categoria }))
    )
    const otrosGastos = data.otros_gastos.map(og => ({ ...og, tipo: 'Otro Gasto' }))
    const ingresos = data.ingresos.map(i => ({ ...i, tipo: 'Ingreso' }))
    const ahorros = data.ahorros.map(a => ({ ...a, tipo: 'Ahorro' }))

    return [...gastosFijos, ...otrosGastos, ...ingresos, ...ahorros]
  }

  // Filtrar transacciones por mes y tipo
  const transaccionesFiltradas = useMemo(() => {
    const todasLasTransacciones = obtenerTodasLasTransacciones()
    return todasLasTransacciones.filter(t => {
      const esMesCorrecto = mesSeleccionado === "todos" || t.fecha.startsWith(mesSeleccionado)
      const esTipoCorrecto = tipoTransaccionFiltro === "todos" || t.tipo === tipoTransaccionFiltro
      return esMesCorrecto && esTipoCorrecto
    })
  }, [mesSeleccionado, tipoTransaccionFiltro])

  // Paginación
  const indexOfLastRecord = paginaActual * registrosPorPagina;
  const indexOfFirstRecord = indexOfLastRecord - registrosPorPagina;
  const transaccionesPaginadas = transaccionesFiltradas.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPaginas = Math.ceil(transaccionesFiltradas.length / registrosPorPagina);

  const handleEditarTransaccion = (transaccion) => {
    setTransaccionEditar(transaccion)
  }

  const handleGuardarEdicion = () => {
    console.log("Guardar edición:", transaccionEditar)
    // Aquí iría la lógica para guardar los cambios
    setTransaccionEditar(null)
  }

  const handleEliminarTransaccion = (transaccion) => {
    setTransaccionEliminar(transaccion)
  }

  const confirmarEliminarTransaccion = () => {
    console.log("Eliminar transacción:", transaccionEliminar)
    // Aquí iría la lógica para eliminar la transacción
    setTransaccionEliminar(null)
  }

  const presupuestoVsGastos = data.gastos_fijos.map(gasto => ({
    name: gasto.categoria,
    presupuesto: gasto.presupuesto,
    gastos: gasto.gastos.reduce((sum, g) => sum + g.monto, 0)
  }))

  const totalIngresos = data.ingresos.reduce((sum, i) => sum + i.monto, 0)
  const totalGastosFijos = data.gastos_fijos.reduce((sum, g) => sum + g.gastos.reduce((s, gasto) => s + gasto.monto, 0), 0)
  const totalOtrosGastos = data.otros_gastos.reduce((sum, g) => sum + g.monto, 0)
  const totalAhorros = data.ahorros.reduce((sum, a) => sum + a.monto, 0)
  const saldoDisponible = totalIngresos - totalGastosFijos - totalOtrosGastos - totalAhorros

  const ingresosVsGastos = [
    { name: 'Ingresos', monto: totalIngresos },
    { name: 'Gastos Fijos', monto: totalGastosFijos },
    { name: 'Otros Gastos', monto: totalOtrosGastos },
    { name: 'Ahorros', monto: totalAhorros },
    { name: 'Saldo Disponible', monto: saldoDisponible }
  ]

  const otrosGastosPorCategoria = data.otros_gastos.reduce((acc, gasto) => {
    if (!acc[gasto.categoria]) {
      acc[gasto.categoria] = 0
    }
    acc[gasto.categoria] += gasto.monto
    return acc
  }, {})

  const otrosGastosData = Object.entries(otrosGastosPorCategoria).map(([name, value]) => ({ name, value }))

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Finanzas Personales</h1>
        <ThemeToggle />
      </div>
      <Tabs defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transacciones">Transacciones del Mes</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="flex justify-between items-center mb-4">
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            <Dialog>
              <DialogTrigger asChild>
                <Button>Agregar Transacción</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nueva Transacción</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="tipo">Tipo de Transacción</Label>
                    <Select onValueChange={setTipoTransaccion}>
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Seleccione el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gasto_fijo">Gasto Fijo</SelectItem>
                        <SelectItem value="otro_gasto">Otro Gasto</SelectItem>
                        <SelectItem value="ingreso">Ingreso</SelectItem>
                        <SelectItem value="ahorro">Ahorro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {tipoTransaccion === "otro_gasto" && (
                    <div>
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre del gasto" />
                    </div>
                  )}
                  {(tipoTransaccion === "otro_gasto" || tipoTransaccion === "gasto_fijo") && (
                    <div>
                      <Label htmlFor="categoria">Categoría</Label>
                      <Input id="categoria" name="categoria" value={formData.categoria} onChange={handleInputChange} placeholder="Categoría" />
                    </div>
                  )}
                  {tipoTransaccion === "ingreso" && (
                    <div>
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre del ingreso" />
                    </div>
                  )}
                  {tipoTransaccion && (
                    <>
                      <div>
                        <Label htmlFor="fecha">Fecha y Hora</Label>
                        <Input id="fecha" name="fecha" type="datetime-local" value={formData.fecha} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="monto">Monto</Label>
                        <Input id="monto" name="monto" type="number" value={formData.monto} onChange={handleInputChange} placeholder="Monto" />
                      </div>
                    </>
                  )}
                  <Button type="submit" disabled={!tipoTransaccion}>Guardar</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumen Financiero</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <div className="flex items-center p-4 bg-green-100 rounded-lg">
                      <DollarSign className="h-10 w-10 text-green-500 mr-4" />
                      <div>
                        <p className="text-sm font-medium text-green-500">Total Ingresos</p>
                        <p className="text-2xl font-bold text-green-700">${totalIngresos.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="flex items-center p-4 bg-red-100 rounded-lg">
                      <CreditCard className="h-10 w-10 text-red-500 mr-4" />
                      <div>
                        <p className="text-sm font-medium text-red-500">Total Gastos</p>
                        <p className="text-2xl font-bold text-red-700">${(totalGastosFijos + totalOtrosGastos).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="flex items-center p-4 bg-blue-100 rounded-lg">
                      <PiggyBank className="h-10 w-10 text-blue-500 mr-4" />
                      <div>
                        <p className="text-sm font-medium text-blue-500">Total Ahorros</p>
                        <p className="text-2xl font-bold text-blue-700">${totalAhorros.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="flex items-center p-4 bg-yellow-100 rounded-lg">
                      <Wallet className="h-10 w-10 text-yellow-500 mr-4" />
                      <div>
                        <p className="text-sm font-medium text-yellow-500">Saldo Disponible</p>
                        <p className="text-2xl font-bold text-yellow-700">${saldoDisponible.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Presupuesto vs Gastos Reales</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={presupuestoVsGastos}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="presupuesto" fill={colorPalette[0]} />
                    <Bar dataKey="gastos" fill={colorPalette[1]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ingresos vs Gastos vs Ahorros</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ingresosVsGastos}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="monto">
                      {ingresosVsGastos.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Otros Gastos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={otrosGastosData}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {otrosGastosData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colorPalette[(index + 6) % colorPalette.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="transacciones">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Select value={mesSeleccionado} onValueChange={setMesSeleccionado}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar mes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los meses</SelectItem>
                  <SelectItem value="2023-01">Enero 2023</SelectItem>
                  <SelectItem value="2023-02">Febrero 2023</SelectItem>
                  <SelectItem value="2023-03">Marzo 2023</SelectItem>
                  <SelectItem value="2023-04">Abril 2023</SelectItem>
                  <SelectItem value="2023-05">Mayo 2023</SelectItem>
                  <SelectItem value="2023-06">Junio 2023</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tipoTransaccionFiltro} onValueChange={setTipoTransaccionFiltro}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo de transacción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Gasto Fijo">Gastos Fijos</SelectItem>
                  <SelectItem value="Otro Gasto">Otros Gastos</SelectItem>
                  <SelectItem value="Ingreso">Ingresos</SelectItem>
                  <SelectItem value="Ahorro">Ahorros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Fecha y Hora</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Categoría/Nombre</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transaccionesPaginadas.map((transaccion) => (
                  <TableRow key={transaccion.id} className="h-10">
                    <TableCell className="py-2">{transaccion.fecha}</TableCell>
                    <TableCell className="py-2">{transaccion.tipo}</TableCell>
                    <TableCell className="py-2">{transaccion.categoria || transaccion.nombre}</TableCell>
                    <TableCell className="text-right py-2">${transaccion.monto.toFixed(2)}</TableCell>
                    <TableCell className="text-right py-2">
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditarTransaccion(transaccion)}>
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleEliminarTransaccion(transaccion)}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="registrosPorPagina">Registros por página:</Label>
                <Select
                  value={registrosPorPagina.toString()}
                  onValueChange={(value) => {
                    setRegistrosPorPagina(Number(value))
                    setPaginaActual(1)
                  }}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
                  disabled={paginaActual === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span>{paginaActual} de {totalPaginas}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
                  disabled={paginaActual === totalPaginas}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo de edición */}
      <Dialog open={!!transaccionEditar} onOpenChange={() => setTransaccionEditar(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Transacción</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            {transaccionEditar?.nombre && (
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={transaccionEditar.nombre}
                  onChange={(e) => setTransaccionEditar({...transaccionEditar, nombre: e.target.value})}
                />
              </div>
            )}
            {transaccionEditar?.categoria && (
              <div>
                <Label htmlFor="categoria">Categoría</Label>
                <Input
                  id="categoria"
                  value={transaccionEditar.categoria}
                  onChange={(e) => setTransaccionEditar({...transaccionEditar, categoria: e.target.value})}
                />
              </div>
            )}
            <div>
              <Label htmlFor="fecha">Fecha y Hora</Label>
              <Input
                id="fecha"
                type="datetime-local"
                value={transaccionEditar?.fecha}
                onChange={(e) => setTransaccionEditar({...transaccionEditar, fecha: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="monto">Monto</Label>
              <Input
                id="monto"
                type="number"
                value={transaccionEditar?.monto}
                onChange={(e) => setTransaccionEditar({...transaccionEditar, monto: parseFloat(e.target.value)})}
              />
            </div>
          </form>
          <DialogFooter>
            <Button onClick={handleGuardarEdicion}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog open={!!transaccionEliminar} onOpenChange={() => setTransaccionEliminar(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de que quieres eliminar esta transacción?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmarEliminarTransaccion}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export function FinanzasPersonalesComponent() {
  return (
    <ThemeProvider>
      <FinanzasPersonalesContent />
    </ThemeProvider>
  )
}