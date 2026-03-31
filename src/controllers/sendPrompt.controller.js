/*
*This controller sends the task and input gotten from the client to the API-connection Service
* After getting the result it redirects to a local API route "result"
*/

import { fetchGeminiApi } from "../services/externalApi.service.js";

export async function sendPromptToAPI(req, res, next) {
  const input = req.body.input;
  const task = req.body.task;

  try {
    const result = await fetchGeminiApi(task, input);

    req.session.output = {
      data: result,
      task: task,
      input: input,
      createdAt: Date.now(),
    };

    console.log(result);
    res.redirect("/result");
  } catch (err) {
    next(err);
  }
}
