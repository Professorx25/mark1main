import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";
import Sandbox from "@e2b/code-interpreter";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "agent/hello" },

  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async() => {
      const sandbox = await Sandbox.create("mark1main");
      return sandbox.sandboxId;
    });

    const helloAgent = createAgent({
      name:"hello-agent",
      description:"A simple agent that says hello",
      system:"You are a helpful assistant. Always greet with enthusiasm",
      model:gemini({model:"gemma-3-1b-it"})
    })

    const { output } = await helloAgent.run("Say Hello to the user!");

    const sandboxUrl = await step.run("get-sandbox-url", async() => {
      const sandbox = await Sandbox.connect(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    })
    
    return{
      message: output[0].content
    }
  },
);