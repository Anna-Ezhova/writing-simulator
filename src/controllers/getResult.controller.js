export function getResult(req, res, next) {
  const stored = req.session.output;

  try {
    if (!stored) {
      return res.redirect("/");
    }

    delete req.session.output;

    if (stored.data === "Error") {
      res.render("failure", { task: stored.task, input: stored.input });
    } else {
      res.render("result", {
        task: stored.task,
        input: stored.input,
        output: stored.data,
      });
    }
  } catch (err) {
    next(err);
  }
}
