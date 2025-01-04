

function stopLoading() {
  let dots = document.getElementById("loader")
  dots.style.display = "none"
}
function startLoading() {
  let dots = document.getElementById("loader")
  dots.style.display = "flex"
}

async function registerBtn() {
  const name = document.getElementById("userName").value;
  const age = document.getElementById("userAge").value;
  const bloodGroup = document.getElementById("bloodGroup").value;
  const number = document.getElementById("userNumber").value;

  //conditions for checks
  if (!name || !age || !bloodGroup || !number) {
    alert('Please fill in all fields!');
    return;
  }
  if (age > 150) {
    alert("invlid age");
    return;
  }

  const data = { name, age, bloodGroup, number };
  try {
    startLoading();
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.json();
      stopLoading();
      alert(`Registration successful!`);
    } else {
      alert('Failed to register. Please try again.');
    }

  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  } finally {
    stopLoading();

  }
}



async function fetchDonars() {

  const errorField = document.getElementById("error-body")
  const searchKeyword = document.getElementById("searchKeyword").value;
  
  if (!searchKeyword||searchKeyword==null) {
    errorField.innerHTML = "select Blood group";
    setTimeout(() => {
      errorField.innerHTML = " "
    }, 2000)
    return
  }

  const data = {
    bloodGroup: searchKeyword
  }

  const response = await fetch('http://localhost:3000/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const jsonList = await response.json()
  console.log(jsonList)

  const donerList = jsonList.doners;
  if (donerList.length < 1) {
    errorField.innerHTML = "donars not found"
    // resultBody.innerHTML=<h1>no donars available</h1>
    setTimeout(() => {
      errorField.innerHTML = " "
    }, 2000)
  } else {
    errorField.innerHTML = jsonList.msg;
    setTimeout(() => {
      errorField.innerHTML = " "
    }, 2000)

  }




  let resultBody = document.getElementById("searchResultBody");



  resultBody.innerHTML = donerList.map((v, i) => {
    return (`<section class="searchItem">
                    <p>NAME: ${v.userName}</p>
                    <p>CONTACT: ${v.userNumber}</p>
                    <div><span>BG: <b>${v.userBloodGroup}</b></span>  <span>AGE: <b>${v.userAge}</b></span></div>
                </section>`
    )
  })



}

