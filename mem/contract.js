export async function handle(state, action) {
  const input = action.input;
  if (input.function === 'store') {
    // const json_object = state.tnxs;
    const  {username, tnxid } = input;

    // Authentication not yet added
    // Check if the username exists in the JSON object
    if (username in state.tnxs) {
      // Username exists, append the new tnxid to the existing array
      state.tnxs[username].push(tnxid);
    } else {
      // Username doesn't exist, create a new element with the username
      state.tnxs[username] = [tnxid];
    }

    return { state };
  }

  
}
