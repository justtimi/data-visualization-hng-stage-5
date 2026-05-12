import { Engine } from "@/core/streamEngine";

const engine = new Engine((data) => {
  console.log(data);
});

console.log(engine);
