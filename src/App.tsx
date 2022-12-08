import clsx from "clsx";
import { useEffect, useState } from "react";
import { Calculator } from "./utils/calculator";

type Operation = "add" | "subtract" | "divide" | "multiply";

type Calculation = [Operation | null, number | null];

function App() {
  const [calculator] = useState(() => new Calculator());
  const [calculation, setCalculation] = useState<Calculation>([null, null]);

  function updateCalculation(action: Operation | number) {
    if (typeof action === "string") {
      setCalculation(([_, n]) => [action, n]);
    } else {
      setCalculation(([operation]) => [operation, action]);
    }
  }

  function evalulate() {
    const [operation, n] = calculation;
    if (operation && n) {
      switch (operation) {
        case "add":
          calculator.add(n);
          break;
        case "divide":
          calculator.divide(n);
          break;
        case "multiply":
          calculator.multiply(n);
          break;
        case "subtract":
          calculator.subtract(n);
          break;
      }
      setCalculation([null, null]);
    }
  }

  function clear() {
    calculator.clear();
    setCalculation([null, null]);
  }

  useEffect(() => {
    console.log(calculation);
  }, [calculation]);

  return (
    <main className="h-screen w-screen bg-slate-800 text-white flex flex-col gap-6 justify-center items-center">
      <div className="grid grid-cols-4 gap-2">
        <div
          data-testid="value"
          className="col-span-4 text-5xl font-medium text-right px-2"
        >
          {calculator.value}
        </div>
        <div
          data-testid="calculation"
          className="col-span-4 text-xl font-medium pb-4 text-right px-2"
        >
          {`${calculator.value} ${calculation[0] ?? ""} ${
            calculation[1] ?? ""
          }`}
        </div>
        <Button data-testid="clear" color="light" onClick={clear}>
          AC
        </Button>
        <Button color="light" onClick={() => {}}>
          {null}
        </Button>
        <Button color="light" onClick={() => {}}>
          {null}
        </Button>
        <Button color="orange" onClick={() => updateCalculation("divide")}>
          /
        </Button>
        <Button onClick={() => updateCalculation(7)}>7</Button>
        <Button onClick={() => updateCalculation(8)}>8</Button>
        <Button onClick={() => updateCalculation(9)}>9</Button>
        <Button color="orange" onClick={() => updateCalculation("multiply")}>
          x
        </Button>
        <Button onClick={() => updateCalculation(4)}>4</Button>
        <Button onClick={() => updateCalculation(5)}>5</Button>
        <Button data-testid="number-6" onClick={() => updateCalculation(6)}>
          6
        </Button>
        <Button
          data-testid="subtract"
          color="orange"
          onClick={() => updateCalculation("subtract")}
        >
          -
        </Button>
        <Button onClick={() => updateCalculation(1)}>1</Button>
        <Button onClick={() => updateCalculation(2)}>2</Button>
        <Button onClick={() => updateCalculation(3)}>3</Button>
        <Button
          data-testid="add"
          color="orange"
          onClick={() => updateCalculation("add")}
        >
          +
        </Button>
        <Button size="big" onClick={() => updateCalculation(0)}>
          0
        </Button>
        <Button onClick={() => {}}>,</Button>
        <Button data-testid="evaluate" color="orange" onClick={evalulate}>
          =
        </Button>
      </div>
    </main>
  );
}

export default App;

type ButtonProps = {
  color?: "light" | "dark" | "orange";
  size?: "regular" | "big";
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function Button({
  color = "dark",
  children,
  size = "regular",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-full flex items-center justify-center text-white font-medium text-2xl",
        size === "big" ? "w-full col-span-2" : "w-20 aspect-square",
        color === "light"
          ? "bg-slate-300 text-slate-800 active:bg-slate-200"
          : color === "dark"
          ? "bg-slate-700 active:bg-slate-600"
          : "bg-orange-400 active:bg-orange-300"
      )}
    >
      {children}
    </button>
  );
}
