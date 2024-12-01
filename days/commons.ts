class MinHeap {
  private heap: number[] = [];

  size(): number {
    return this.heap.length;
  }

  insert(value: number) {
    this.heap.push(value);
    this.heapifyUp();
  }

  private heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] < this.heap[parentIndex]) {
        [this.heap[index], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[index],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  extractMin(): number {
    if (this.heap.length === 0) {
      return Infinity;
    }

    if (this.heap.length === 1) {
      return this.heap.pop()!;
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();
    return min;
  }

  private heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestIndex = index;

      // Compare with left child
      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = leftChildIndex;
      }

      // Compare with right child
      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = rightChildIndex;
      }

      // If no swaps needed, we're done
      if (smallestIndex === index) {
        break;
      }

      // Swap with the smallest child
      [this.heap[index], this.heap[smallestIndex]] = [
        this.heap[smallestIndex],
        this.heap[index],
      ];
      index = smallestIndex;
    }
  }
}

export { MinHeap };
