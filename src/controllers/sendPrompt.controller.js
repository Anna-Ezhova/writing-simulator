import { fetchGeminiApi } from "../services/externalApi.service.js";


export async function sendPromptToAPI(req, res, next) {

 

const input = req.body.input;
const task = req.body.task

   

  
   try {
    const result = await fetchGeminiApi(task, input);

    

    req.session.output = {
      data: result,
      task: task,
      input: input,
      createdAt: Date.now()
    };

    console.log(result)
     res.redirect("/result");
  } catch (err) {
    next(err);
  }   
}
