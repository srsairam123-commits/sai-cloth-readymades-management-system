const API_URL = "https://script.google.com/macros/s/AKfycbwC5PTo517LKKQ28Z7qYbOXK8JY1nD4qx8LnbIGsADH_lLQMSP2eJJulNXKOIBY7TOt-A/exec";

export async function addTransaction(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
    action: "addTransaction",
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    ...data,
}),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to connect to server",
    };
  }
}

export async function getTransactions() {

  try {

    const response = await fetch(API_URL, {

      method: "POST",

      body: JSON.stringify({
        action: "getTransactions"
      })

    });

    return await response.json();

  } catch (error) {

    console.error(error);

    return {
      success: false,
      transactions: []
    };

  }

}

export async function getDashboardSummary() {

  try {

    const response = await fetch(API_URL,{

      method:"POST",

      body:JSON.stringify({

        action:"getDashboardSummary"

      })

    });

    return await response.json();

  }
  catch(error){

    return{
      success:false
    };

  }

}
export async function login(username, password) {

  try {

    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        username,
        password,
      }),
    });

    return await response.json();

  } catch (error) {

    return {
      success: false,
      message: "Unable to connect to server",
    };

  }

}
export async function getUsers() {

  try {

    const response = await fetch(API_URL, {

      method: "POST",

      body: JSON.stringify({

        action: "getUsers"

      })

    });

    return await response.json();

  } catch (error) {

    return {
      success: false,
      users: []
    };

  }

}
export async function addUser(data) {

  try {

    const response = await fetch(API_URL, {

      method: "POST",

      body: JSON.stringify({
    action: "addUser",
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    ...data,
}),

    });

    return await response.json();

  } catch (error) {

    return {

      success: false,

      message: "Unable to connect"

    };

  }

}
export async function updateUser(data) {

  try {

    const response = await fetch(API_URL, {

      method: "POST",

      body: JSON.stringify({
    action: "updateUser",

    loginUsername: localStorage.getItem("username"),
    loginRole: localStorage.getItem("role"),

    ...data
})

    });

    return await response.json();

  } catch (error) {

    return {

      success: false,

      message: "Unable to connect"

    };

  }

}
export async function getSettings() {

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "getSettings"
    })
  });

  return await response.json();

}
export async function saveSettings(data) {

  const response = await fetch(API_URL, {

    method: "POST",

    body: JSON.stringify({

      action: "saveSettings",

      loginUsername: localStorage.getItem("username"),
      loginRole: localStorage.getItem("role"),

      ...data

    })

  });

  return await response.json();

}
export async function changePassword(data) {

  try {

    const response = await fetch(API_URL, {

      method: "POST",

      body: JSON.stringify({

        action: "changePassword",

        loginUsername: localStorage.getItem("username"),

        ...data

      })

    });

    return await response.json();

  } catch (error) {

    return {
      success: false,
      message: "Unable to connect"
    };

  }

}