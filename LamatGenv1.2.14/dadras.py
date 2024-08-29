import math
import random

def producto_punto(a,b):
	producto = a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
	return producto

def producto_cruz(u, v):
	i = u[1]*v[2] - u[2]*v[1]
	j = u[2]*v[0] - u[0]*v[2]
	k = u[0]*v[1] - u[1]*v[0]
	norma = math.sqrt(i*i + j*j + k*k)
	w = [i/norma, j/norma, k/norma]
	return w

def generador_planos(p1, p2):
	x = 0.0
	y = 0.0
	z = 0.0
	if p1[2] != p2[2]: 
		x = 1.0
		y = 0.0
		z = ((p2[0]-p1[0])*(x-p1[0])+(p2[1]-p1[1])*(y-p1[1])-	p1[2]*(p2[2]-p1[2]))/(p1[2]-p2[2])
	elif p1[1] != p2[1]:
		x = 0
		z = 1
		y = ((p2[0]-p1[0])*(x-p1[0])+(p2[2]-p1[2])*(z-p1[2])-p1[1]*(p2[1]-p1[1]))/(p1[1]-p2[1])
	elif p1[0] != p2[0]:
		z = 0
		y = 1
		x = ((p2[1]-p1[1])*(y-p1[1])+(p2[2]-p1[2])*(z-p1[2])-p1[0]*(p2[0]-p1[0]))/(p1[0]-p2[0])
	
	base1 = [x-p1[0],y-p1[1],z-p1[2]]
	norma_base1 = ((base1[0]**2)+(base1[1])**2+(base1[2])**2)**0.5
	base1 = [base1[0]/norma_base1, base1[1]/norma_base1, base1[2]/norma_base1]
	eje = [p2[0]-p1[0], p2[1]-p1[1], p2[2]-p1[2]]
	base2 = producto_cruz(eje, base1)
	return [base1, base2]
	
def generar_puntos(base1, base2, radio, n_puntos, pinicial, pfinal):
	vectores_alrededor = []
	for i in range(n_puntos):
		tapas = []
		angulo = 2*(math.pi)*i/n_puntos
		punto_alrededor = [radio*(base1[0]*math.cos(angulo)+base2[0]*math.sin(angulo)), radio*(base1[1]*math.cos(angulo)+base2[1]*math.sin(angulo)), radio*(base1[2]*math.cos(angulo)+base2[2]*math.sin(angulo))]
		
		tapa1 = [punto_alrededor[0]+pinicial[0], punto_alrededor[1]+pinicial[1], punto_alrededor[2]+pinicial[2]]
		
		tapas.append(tapa1)
		
		tapa2 = [punto_alrededor[0]+pfinal[0], punto_alrededor[1]+pfinal[1], punto_alrededor[2]+pfinal[2]]
	
		tapas.append(tapa2)
		vectores_alrededor.append(tapas)
		
	'''# Cerrar la espiral conectando el último punto con el primero
	tapa1 = [radio * base1[0] + pinicial[0], radio * base1[1] + pinicial[1], radio * base1[2] + pinicial[2]]		
	tapa2 = [radio * base1[0] + pfinal[0], radio * base1[1] + pfinal[1], radio * base1[2] + pfinal[2]]
	vectores_alrededor.append([tapa1, tapa2])'''
			
	return vectores_alrededor
	
def base_rotada(base, p1, p2):
	eje = [p2[0]-p1[0], p2[1]-p1[1], p2[2]-p1[2]]
	norma_eje = math.sqrt(pow(eje[0], 2) + pow(eje[1], 2) + pow(eje[2], 2))
	eje = [eje[0]/norma_eje, eje[1]/norma_eje, eje[2]/norma_eje]
	
	angulo_base1 = (math.pi)/2 - math.acos(producto_punto(base, eje))
	eje_rotacion1 = producto_cruz(eje, base)
	norma_rotacion = math.sqrt(pow(eje_rotacion1[0], 2) + pow(eje_rotacion1[1], 2) + pow(eje_rotacion1[2], 2))
	eje_rotacion1 = [eje_rotacion1[0]/norma_rotacion, eje_rotacion1[1]/norma_rotacion, eje_rotacion1[2]/norma_rotacion]
	vector_rotado = [base[0]*math.cos(angulo_base1) + (eje_rotacion1[0]*eje_rotacion1[0]*base[0] + eje_rotacion1[0]*eje_rotacion1[1]*base[1] + eje_rotacion1[0]*eje_rotacion1[2]*base[2])*(1-math.cos(angulo_base1)) + (eje_rotacion1[1]*base[2]-eje_rotacion1[2]*base[1])*math.sin(angulo_base1), base[1]*math.cos(angulo_base1) + (eje_rotacion1[1]*eje_rotacion1[0]*base[0] + eje_rotacion1[1]*eje_rotacion1[1]*base[1] + eje_rotacion1[1]*eje_rotacion1[2]*base[2])*(1-math.cos(angulo_base1)) + (eje_rotacion1[2]*base[0]-eje_rotacion1[0]*base[2])*math.sin(angulo_base1), base[2]*math.cos(angulo_base1) + (eje_rotacion1[2]*eje_rotacion1[0]*base[0] + eje_rotacion1[2]*eje_rotacion1[1]*base[1] + eje_rotacion1[2]*eje_rotacion1[2]*base[2])*(1-math.cos(angulo_base1)) + (eje_rotacion1[0]*base[1]-eje_rotacion1[1]*base[0])*math.sin(angulo_base1)]
	norma_rotada = math.sqrt(pow(vector_rotado[0], 2) + pow(vector_rotado[1], 2) + pow(vector_rotado[2], 2))
	base1 = [vector_rotado[0]/norma_rotada, vector_rotado[1]/norma_rotada, vector_rotado[2]/norma_rotada]
	base2 = producto_cruz(eje, vector_rotado)
	return [base1, base2]
	
def generar_curva(parametrizacion, espesor, n_puntos, nombre_del_archivo):
    
   with open(nombre_del_archivo + ".obj", "w") as archivo:
    radio_del_tubo = espesor / 2

    plano = generador_planos(parametrizacion[0], parametrizacion[1])

    puntos_circulares = generar_puntos(plano[0], plano[1], radio_del_tubo, n_puntos, parametrizacion[0], parametrizacion[1])
	# Escribir vertices
    for k in range(2):
        archivo.write(f"v {parametrizacion[k][0]} {parametrizacion[k][1]} {parametrizacion[k][2]}\n")
        for i in range(n_puntos):
            archivo.write(f"v {puntos_circulares[i][k][0]} {puntos_circulares[i][k][1]} {puntos_circulares[i][k][2]}\n")

    if len(parametrizacion) != 2:
        base_rotacion = plano[0]
        for j in range(len(parametrizacion) - 1):
            planos = base_rotada(base_rotacion, parametrizacion[j], parametrizacion[j + 1])
            puntos_circulares = generar_puntos(planos[0], planos[1], radio_del_tubo, n_puntos, parametrizacion[j], parametrizacion[j + 1])
            base_rotacion = planos[0]
            archivo.write(f"v {parametrizacion[j + 1][0]} {parametrizacion[j + 1][1]} {parametrizacion[j + 1][2]}\n")
            for i in range(n_puntos):
                archivo.write(f"v {puntos_circulares[i][1][0]} {puntos_circulares[i][1][1]} {puntos_circulares[i][1][2]}\n")
	#Escribir caras
    for i in range(n_puntos):
        if i != n_puntos - 1:
             archivo.write(f"f 1 {i + 3} {i + 2}\n")
        else:
             archivo.write(f"f 1 2 {n_puntos + 1}\n")

    for k in range(len(parametrizacion) - 1):
        for i in range(n_puntos):
            if i != n_puntos - 1:
                archivo.write(f"f {i + 3 + (k + 1) * (n_puntos + 1)} {i + 2 + (k + 1) * (n_puntos + 1)} {i + 2 + k * (n_puntos + 1)}\n")
                archivo.write(f"f {i + 2 + k * (n_puntos + 1)} {i + 3 + k * (n_puntos + 1)} {i + 3 + (k + 1) * (n_puntos + 1)}\n")
            else:
                archivo.write(f"f {n_puntos + 1 + (k + 1) * (n_puntos + 1)} {n_puntos + 1 + k * (n_puntos + 1)} {2 + k * (n_puntos + 1)}\n")
                archivo.write(f"f {2 + k * (n_puntos + 1)} {n_puntos + 3 + k * (n_puntos + 1)} {2 * (n_puntos + 1) + k * (n_puntos + 1)}\n")
         

    for i in range(n_puntos):
        if i != n_puntos - 1:
            archivo.write(f"f {i + 2 + (len(parametrizacion) - 1) * (n_puntos + 1)} {i + 3 + (len(parametrizacion) - 1) * (n_puntos + 1)} {1 + (len(parametrizacion) - 1) * (n_puntos + 1)}\n")
        else:
            archivo.write(f"f {n_puntos + 1 + (len(parametrizacion) - 1) * (n_puntos + 1)} {2 + (len(parametrizacion) - 1) * (n_puntos + 1)} {1 + (len(parametrizacion) - 1) * (n_puntos + 1)}\n")


    print(f"Archivo {nombre_del_archivo}.obj generado exitosamente.")


