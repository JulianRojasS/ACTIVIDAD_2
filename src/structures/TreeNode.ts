// Se define la clase TreeNode que representa un nodo en un árbol binario
// Esta clase contiene un valor y referencias a los nodos izquierdo y derecho
// La clase utiliza un tipo genérico T para permitir el uso de diferentes tipos de datos
/// @param {T} - Tipo de dato que almacena el valor del nodo
// @param {TreeNode<T> | null} - Nodo izquierdo del árbol
// @param {TreeNode<T> | null} - Nodo derecho del árbol
// @returns {void} - Constructor de la clase TreeNode

class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// Se define la clase BinaryTree que representa un árbol binario
// Esta clase permite insertar nodos, buscar valores y recorrer el árbol en orden
// La clase utiliza un tipo genérico T para permitir el uso de diferentes tipos de datos
// @param {T} - Tipo de dato que almacena el valor del nodo
// @param {TreeNode<T> | null} - Nodo raíz del árbol

export class BinaryTree<T> {
  root: TreeNode<T> | null = null;

  // Este metodo lista los valores del árbol en orden
  // Se utiliza un recorrido en orden (in-order traversal) para obtener los valores
  // @returns {T[]} - Un array con los valores del árbol en orden
  list = (): T[] => {
    const result: T[] = [];
    this.inOrderTraversal(this.root, result);
    return result;
  }

  // Este método realiza un recorrido en orden del árbol
  // y almacena los valores en el array result
  // Se utiliza recursión para visitar los nodos en el orden correcto
  // @param {TreeNode<T> | null} node - El nodo actual del árbol
  // @param {T[]} result - El array donde se almacenan los valores del recorrido
  // @returns {void}
  private inOrderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push(node.value);
      this.inOrderTraversal(node.right, result);
    }
  }

  // Este método inserta un nuevo nodo en el árbol
  // Se utiliza un comparador (compareFn) para determinar la posición del nuevo nodo
  // El comparador debe devolver un número negativo si el primer argumento es menor que el segundo,
  // @param {T} value - El valor a insertar en el árbol
  // @param {(a: T, b: T) => number} compareFn - Función de comparación para determinar la posición del nuevo nodo
  // @returns {void}
  insert = (value: T, compareFn: (a: T, b: T) => number): void  =>{
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode, compareFn);
    }
  }

  // Este método inserta un nuevo nodo en el árbol de manera recursiva
  // Se utiliza el comparador para determinar si el nuevo nodo va a la izquierda o a la derecha del nodo actual
  // @param {TreeNode<T>} node - El nodo actual del árbol
  // @param {TreeNode<T>} newNode - El nuevo nodo a insertar
  // @param {(a: T, b: T) => number} compareFn - Función de comparación para determinar la posición del nuevo nodo
  // @returns {void}
  private insertNode(
    node: TreeNode<T>,
    newNode: TreeNode<T>,
    compareFn: (a: T, b: T) => number
  ): void {
    if (compareFn(newNode.value, node.value) < 0) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode, compareFn);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode, compareFn);
      }
    }
  }

  // Este método busca un valor en el árbol utilizando un comparador
  // Se utiliza recursión para recorrer el árbol y encontrar el valor
  // @param {T} value - El valor a buscar en el árbol
  // @param {(a: T, b: T) => number} compareFn - Función de comparación para determinar la posición del valor
  // @returns {T | null} - El valor encontrado o null si no se encuentra
  // @throws {Error} - Si el comparador no es una función
  search = (value: T, compareFn: (a: T, b: T) => number): T | null => {
    return this.searchNode(this.root, value, compareFn);
  }

  // Este método busca un valor en el árbol de manera recursiva
  // Se utiliza el comparador para determinar si el valor es menor o mayor que el nodo actual
  // @param {TreeNode<T> | null} node - El nodo actual del árbol
  // @param {T} value - El valor a buscar en el árbol
  // @param {(a: T, b: T) => number} compareFn - Función de comparación para determinar la posición del valor
  // @returns {T | null} - El valor encontrado o null si no se encuentra
  private searchNode = (
    node: TreeNode<T> | null,
    value: T,
    compareFn: (a: T, b: T) => number
  ): T | null => {
    if (!node) return null;
    const comparison = compareFn(value, node.value);
    if (comparison === 0) return node.value;
    return comparison < 0
      ? this.searchNode(node.left, value, compareFn)
      : this.searchNode(node.right, value, compareFn);
  }
}
