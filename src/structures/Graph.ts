
// Graph.ts
// Clase que representa un grafo genérico con nodos y aristas
// Esta clase permite agregar nodos, aristas, eliminar nodos y aristas,
// obtener vecinos de un nodo y más.
// @template T - Tipo de los nodos del grafo
// @template E - Tipo de la información asociada a las aristas (opcional)
export class Graph<T, E = any> {
  private adjacencyList: Map<T, Map<T, E>> = new Map();

  // Verifica si un nodo existe en el grafo
  // @param vertex - El nodo a verificar
  // @returns true si el nodo existe, false en caso contrario
  private hasVertex(vertex: T): boolean {
    return this.adjacencyList.has(vertex);
  }

  // Agrega un nodo al grafo
  // @param vertex - El nodo a agregar
  // @returns void
  addVertex(vertex: T): void {
    if (!this.hasVertex(vertex)) {
      this.adjacencyList.set(vertex, new Map());
    }
  }

  // Agrega una arista entre dos nodos
  // @param vertex1 - El nodo de origen
  // @param vertex2 - El nodo de destino
  // @param edgeInfo - Información adicional sobre la arista (opcional)
  addEdge(vertex1: T, vertex2: T, edgeInfo?: E): void {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacencyList.get(vertex1)!.set(vertex2, edgeInfo as E);
  }

  // Elimina una arista entre dos nodos
  // @param vertex1 - El nodo de origen
  // @param vertex2 - El nodo de destino
  removeEdge(vertex1: T, vertex2: T): void {
    if (this.hasVertex(vertex1)) {
      this.adjacencyList.get(vertex1)!.delete(vertex2);
    }
  }

  // Elimina un nodo del grafo y todas sus aristas asociadas
  // @param vertex - El nodo a eliminar
  removeVertex(vertex: T): void {
    if (this.hasVertex(vertex)) {
      this.adjacencyList.delete(vertex);
      for (const neighbors of this.adjacencyList.values()) {
        neighbors.delete(vertex);
      }
    }
  }

  // Obtiene los vecinos de un nodo
  // @param vertex - El nodo del cual obtener los vecinos
  // @returns Un array de nodos vecinos
  getNeighbors(vertex: T): T[] {
    if (!this.hasVertex(vertex)) return [];
    return Array.from(this.adjacencyList.get(vertex)!.keys());
  }

  // Obtiene la información de una arista entre dos nodos
  // @param vertex1 - El nodo de origen
  // @param vertex2 - El nodo de destino
  // @returns La información de la arista o undefined si no existe
  getEdgeInfo(vertex1: T, vertex2: T): E | undefined {
    if (!this.hasVertex(vertex1)) return undefined;
    return this.adjacencyList.get(vertex1)!.get(vertex2);
  }

  // Obtiene todos los nodos del grafo
  // @returns Un array de nodos
  getVertices(): T[] {
    return Array.from(this.adjacencyList.keys());
  }

  // Obtiene todas las aristas del grafo
  // @returns Un array de objetos que representan las aristas con su información
  getAllEdges(): Array<{ from: T; to: T; info: E }> {
    const edges: Array<{ from: T; to: T; info: E }> = [];
    for (const [from, neighbors] of this.adjacencyList.entries()) {
      for (const [to, info] of neighbors.entries()) {
        edges.push({ from, to, info });
      }
    }
    return edges;
  }
}