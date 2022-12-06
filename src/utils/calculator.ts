interface StoreItem {
  initial: number;
  operation: "addition" | "division";
  result: number;
}

export class Calculator {
  value: number = 0;
  store: Array<StoreItem> = [];

  private trim(n: number) {
    return parseFloat(n.toFixed(1));
  }

  private addToStore(
    initial: number,
    operation: StoreItem["operation"],
    result: number
  ) {
    this.store.push({
      initial,
      operation,
      result,
    });
  }

  add(n: number) {
    const initial = this.value;
    this.value = this.trim(this.value + n);
    this.addToStore(initial, "addition", this.value);
    return this.value;
  }

  divide(n: number) {
    const initial = this.value;
    if (n === 0) {
      throw new Error("Not allowed to divide by 0");
    }
    this.value = this.trim(this.value / n);
    this.addToStore(initial, "division", this.value);
    return this.value;
  }
}
