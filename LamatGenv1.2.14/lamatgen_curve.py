import math
import random
import numpy as np


def progressBar(percentaje):
	percentaje = min(max(percentaje, 0), 100)
	numFilledChars = percentaje // 2
	bar = ""
	bar += "\033[36m["
	for i in range(50):
		if i < numFilledChars:
			bar += "■"
		else:
			bar += " "
	
	bar += "] " + str(percentaje) + "%\033[0m"
	return bar


def solve(f, t_span, y0, h):
        print("\033[1m\033[44m\033[33mSe ha agregado un conjunto de puntos de un sistema de ecuaciones diferenciales. Resolviendo por el método de Runge-Kutta de orden 4...\033[0m")
        
        t0 = t_span[0]
        tf = t_span[1]
        
        n_steps = int((tf - t0) / h) + 1
        
        print(f"\033[1m\033[32mGenerando solución con \033[35m{n_steps}\033[32m puntos.\n")
        
        y_val = [[0.0] * len(y0) for _ in range(n_steps)]
        yk2 = [0.0] * len(y0)
        yk3 = [0.0] * len(y0)
        yk4 = [0.0] * len(y0)
        
        y_val[0] = y0
        
        for i in range(1, n_steps):
            t_n = t0 + h * (i - 1)
            y_n = y_val[i - 1]
            
            k1 = f(t_n, y_n)
            
            for j in range(len(y0)):
                yk2[j] = y_n[j] + 0.5 * h * k1[j]
            k2 = f(t_n + 0.5 * h, yk2)

            for j in range(len(y0)):
                yk3[j] = y_n[j] + 0.5 * h * k2[j]
            k3 = f(t_n + 0.5 * h, yk3)
            
            for j in range(len(y0)):
                yk4[j] = y_n[j] + h * k3[j]
            k4 = f(t_n + h, yk4)
            
            for j in range(len(y0)):
                y_val[i][j] = y_n[j] + (h / 6.0) * (k1[j] + 2.0 * k2[j] + 2.0 * k3[j] + k4[j])
            
            print("\033[34m({}/{}) {}\n\033[A\033[K".format(i, n_steps, progressBar(round((i * 100) / n_steps))))
        print("\033[A\033[K")
        print("\033[32m [ Solución \033[0m\033[35m({} puntos)\033[0m\033[32m generada ]\033[0m \n".format(n_steps))

        return y_val

def puntos_consecutivos(puntos, op):
	print("\n\033[31m\033[1mAdvertencia:\033[0m\033[33mSe han detectado un mínimo de \033[1m\033[35m", puntos, " \033[0m\033[33mpuntos identicos consecutivos. ¿Seguir detectando puntos consecutivos? (Y/n). ", end="")
	
	res = input()
	
	if res == "n" or res == "N":
		op = False
		print("\033[31m [ Detección de puntos consecutivos apagada ]\033[0m \n")
	elif res == "y" or res == "Y":
		op = True
		print("\033[32m Continuando... \033[0m \n")
	else:
		print("\033[1m\033[31m Respuesta inválida.\n \033[0m")
		op = puntos_consecutivos(puntos, op)
	
	return op


def advertencia_punto_fijo(p1_i, p2_i, p1, p2):
	
	respuesta_positiva_count = 0
	puntos_consecutivos_count = 0
	selec_op = False
	guarda_vec = []

	if np.array_equal(p1, p2):
		if not np.array_equal(guarda_vec, p1):
			respuesta_positiva_count = 0
		if respuesta_positiva_count < 3:
			selec_op = True
			print("\033[31m\033[1mAdvertencia:\033[0m\033[33m Los puntos número\033[35m\033[1m {}\033[0m\033[33m y \033[1m\033[35m{}\033[0m\033[33m se repiten de forma consecutiva. Esto puede causar discontinuidades en el modelo generado. ¿Continuar? (Y/n): ".format(p1_i, p2_i), end="")
			respuesta = input()
			if respuesta == "n" or respuesta == "N":
				print("\033[31mAbortando...\033[0m \n")
				exit(0)
			elif respuesta == "y" or respuesta == "Y":
				respuesta_positiva_count += 1
				puntos_consecutivos_count += 1
				if respuesta_positiva_count >= 3:
					selec_op = puntos_consecutivos(puntos_consecutivos_count, selec_op)
					return
				guarda_vec = p1
				print("\033[32m Continuando... \033[0m \n")
			else:
				print("\033[1m\033[31m Respuesta inválida.\n \033[0m")
				advertencia_punto_fijo(p1_i, p2_i, p1, p2)
	elif selec_op == True:
		puntos_consecutivos_count += 1
		selec_op = puntos_consecutivos(puntos_consecutivos_count, selec_op)
		guarda_vec = 1
		return
	else:
		return

		
		
def advertencia_exceso(triangulos):
	if triangulos >= 1000000:
		print("\033[31m\033[1mAdvertencia: \033[0m\033[33m Los parámetros ingresados generan un modelo de más de 1M de triángulos, aunque posible de procesar, en equipos de bajos recursos puede causar problemas de renderizado o visualización del objeto, ¿Continuar? (Y/n): ", end="")
		
		respuesta = input()
		
		if respuesta == "n" or respuesta == "N":
			print("\033[31mConsejo: Una forma de reducir la cantidad de triángulos generados es reducir el número de puntos o la resolución del objeto\nAbortando...\033[0m \n")
			exit(0)
		elif respuesta == "y" or respuesta == "Y":
			print("\033[32m Continuando... \033[0m \n")
		else:
			print("\033[1m\033[31m Respuesta inválida.\n \033[0m")
			advertencia_exceso(triangulos)
		





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
	print("\033[1m\033[44m\033[33mGenerando base inicial del modelo...\033[0m")
	
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
	
	print("\033[32m [ Base inicial generada ] \033[0m \n")
	
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
    total_vertices = len(parametrizacion)*(n_puntos + 1)
    total_triangulos = n_puntos*2*len(parametrizacion)
    advertencia_exceso(total_triangulos)
    
    with open(nombre_del_archivo + ".obj", "w") as archivo:
        radio_del_tubo = espesor / 2
        advertencia_punto_fijo(0, 1, parametrizacion[0], parametrizacion[1])
        plano = generador_planos(parametrizacion[0], parametrizacion[1])
        puntos_circulares = generar_puntos(plano[0], plano[1], radio_del_tubo, n_puntos, parametrizacion[0], parametrizacion[1])
        print("\033[1m\033[44m\033[33mGenerando vértices de la curva...\033[0m")
        
        for k in range(2):
            archivo.write(f"v {parametrizacion[k][0]} {parametrizacion[k][1]} {parametrizacion[k][2]}\n")
            for i in range(n_puntos):
                archivo.write(f"v {puntos_circulares[i][k][0]} {puntos_circulares[i][k][1]} {puntos_circulares[i][k][2]}\n")
        
        vertices_iniciales = 2+2*n_puntos
        
        print(f"\033[34m({vertices_iniciales}/{total_vertices})  {progressBar(round((vertices_iniciales*100)/total_vertices))}")
        
        if len(parametrizacion) != 2:
            base_rotacion = plano[0]
            for j in range(len(parametrizacion) - 1):
                advertencia_punto_fijo(j, j+1, parametrizacion[j], parametrizacion[j+1])
                planos = base_rotada(base_rotacion, parametrizacion[j], parametrizacion[j + 1])
                puntos_circulares = generar_puntos(planos[0], planos[1], radio_del_tubo, n_puntos, parametrizacion[j], parametrizacion[j + 1])
                base_rotacion = planos[0]
                archivo.write(f"v {parametrizacion[j + 1][0]} {parametrizacion[j + 1][1]} {parametrizacion[j + 1][2]}\n")
                for i in range(n_puntos):
                    archivo.write(f"v {puntos_circulares[i][1][0]} {puntos_circulares[i][1][1]} {puntos_circulares[i][1][2]}\n")
                print("\033[A\033[K")
                vertices_gen = int(vertices_iniciales + (j+2)*n_puntos) + 1
                print(f"{vertices_gen = } \033[34m(  {vertices_gen}/{total_vertices}) {progressBar(round((vertices_gen*100)/total_vertices))}")
        print("\033[A\033[K")
        print("\033[32m [ Vértices generados ] \033[0m \n")
        print("\033[1m\033[44m\033[33mGenerando triángulos del modelo...\033[0m")
        
        for i in range(n_puntos):
            if i != n_puntos - 1:
                archivo.write(f"f 1 {i + 3} {i + 2}\n")
            else:
                archivo.write(f"f 1 2 {n_puntos + 1}\n")
            print(f"\033[34m({i+1}/{total_triangulos}) {progressBar(round((i*100)/total_triangulos))}")
            print("\033[A" + "\033[K")
        '''print()'''
        print("\033[A" + "\033[K")
        print("\033[32m [ Primera tapa generada ] \033[0m")
        
        for k in range(len(parametrizacion) - 1):
            for i in range(n_puntos):
                if i != n_puntos - 1:
                    archivo.write(f"f {i + 3 + (k + 1) * (n_puntos + 1)} {i + 2 + (k + 1) * (n_puntos + 1)} {i + 2 + k * (n_puntos + 1)}\n")
                    archivo.write(f"f {i + 2 + k * (n_puntos + 1)} {i + 3 + k * (n_puntos + 1)} {i + 3 + (k + 1) * (n_puntos + 1)}\n")
                else:
                    archivo.write(f"f {n_puntos + 1 + (k + 1) * (n_puntos + 1)} {n_puntos + 1 + k * (n_puntos + 1)} {2 + k * (n_puntos + 1)}\n")
                    archivo.write(f"f {2 + k * (n_puntos + 1)} {n_puntos + 3 + k * (n_puntos + 1)} {2 * (n_puntos + 1) + k * (n_puntos + 1)}\n")
            print(f"\033[34m({n_puntos*(2*k+3)}/{total_triangulos}) {progressBar(round(((n_puntos*(2*k+3))*100)/total_triangulos))}")
            print("\033[A\033[K")
        '''print()'''
        print("\033[A\033[K")
        print("\033[32m [ Frontera generada ] \033[0m")
        
        for i in range(n_puntos):
            if i != n_puntos - 1:
                archivo.write(f"f {i + 2 + (len(parametrizacion) - 1) * (n_puntos + 1)} {i + 3 + (len(parametrizacion) - 1) * (n_puntos + 1)} {1 + (len(parametrizacion) - 1) * (n_puntos + 1)}\n")
            else:
                archivo.write(f"f {n_puntos + 1 + (len(parametrizacion) - 1) * (n_puntos + 1)} {2 + (len(parametrizacion) - 1) * (n_puntos + 1)} {1 + (len(parametrizacion) - 1) * (n_puntos + 1)}\n")
            print(f"\033[34m({n_puntos*(2*len(parametrizacion)+1) + i + 1}/{total_triangulos} ]  {progressBar(round(((n_puntos*(2*len(parametrizacion)+1) + i + 1)*100)/total_triangulos))}%")
            print("\033[A\033[K")
        '''print()'''
        print("\033[A\033[K")
        print("\033[32m [ Segunda tapa generada ] \033[0m\n")
        print(f"\033[1m\033[32m Curva \033[35m\033[4m{nombre_del_archivo}\033[0m\033[1m\033[32m generada exitosamente.")
        print(f"Curva {nombre_del_archivo} generada.")



