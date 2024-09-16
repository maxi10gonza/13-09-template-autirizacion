export const todosPage = () => {
  const container = document.createElement("div");

  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.minHeight = "100vh";
  container.style.backgroundColor = "#e2e8f0"; // Un color gris claro

  // Botón Home
  const btnHome = document.createElement("button");
  btnHome.style.backgroundColor = "#4a5568"; // Color gris oscuro
  btnHome.style.color = "white";
  btnHome.style.padding = "10px";
  btnHome.style.borderRadius = "5px";
  btnHome.style.marginBottom = "10px";
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  // Título
  const title = document.createElement("h1");
  title.style.fontSize = "24px";
  title.style.fontWeight = "bold";
  title.style.marginBottom = "20px";
  title.textContent = "List of Todos";

  // Botón Crear
  const btnCreate = document.createElement("button");
  btnCreate.style.backgroundColor = "#38a169"; // Color verde
  btnCreate.style.color = "white";
  btnCreate.style.padding = "10px";
  btnCreate.style.borderRadius = "5px";
  btnCreate.style.marginBottom = "20px";
  btnCreate.textContent = "Create Todo";

  // Tabla
  const table = document.createElement("table");
  table.style.width = "80%";
  table.style.backgroundColor = "white";
  table.style.borderCollapse = "collapse";
  table.style.marginBottom = "20px";

  // Crear la cabecera de la tabla
  const thead = document.createElement("thead");
  thead.style.backgroundColor = "#4a5568"; // Gris oscuro
  thead.style.color = "white";

  const tr = document.createElement("tr");

  const th1 = document.createElement("th");
  th1.style.padding = "10px";
  th1.style.border = "1px solid #e2e8f0";
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.style.padding = "10px";
  th2.style.border = "1px solid #e2e8f0";
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.style.padding = "10px";
  th3.style.border = "1px solid #e2e8f0";
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.style.padding = "10px";
  th4.style.border = "1px solid #e2e8f0";
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.style.padding = "10px";
  th5.style.border = "1px solid #e2e8f0";
  th5.textContent = "Actions";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);
  thead.appendChild(tr);

  const tbody = document.createElement("tbody");

  table.appendChild(thead);
  table.appendChild(tbody);

  // Función para agregar una fila a la tabla
  const addTodoToTable = (todo) => {
    const tr = document.createElement("tr");
    tr.style.backgroundColor = "#f7fafc"; // Gris claro
    tr.style.borderBottom = "1px solid #e2e8f0";

    const td1 = document.createElement("td");
    td1.style.padding = "10px";
    td1.style.border = "1px solid #e2e8f0";
    td1.style.textAlign = "center";
    td1.textContent = todo.id;

    const td2 = document.createElement("td");
    td2.style.padding = "10px";
    td2.style.border = "1px solid #e2e8f0";
    td2.style.textAlign = "center";
    td2.textContent = todo.title;

    const td3 = document.createElement("td");
    td3.style.padding = "10px";
    td3.style.border = "1px solid #e2e8f0";
    td3.style.textAlign = "center";
    td3.textContent = todo.completed ? "Sí" : "No";

    const td4 = document.createElement("td");
    td4.style.padding = "10px";
    td4.style.border = "1px solid #e2e8f0";
    td4.style.textAlign = "center";
    td4.textContent = todo.owner;

    const td5 = document.createElement("td");
    td5.style.padding = "10px";
    td5.style.border = "1px solid #e2e8f0";
    td5.style.textAlign = "center";

    // Botón de eliminar
    const btnDelete = document.createElement("button");
    btnDelete.style.backgroundColor = "#e53e3e"; // Rojo
    btnDelete.style.color = "white";
    btnDelete.style.padding = "5px";
    btnDelete.style.borderRadius = "3px";
    btnDelete.textContent = "Delete";
    btnDelete.addEventListener("click", () => {
      fetch(`http://localhost:4000/todos/${todo.id}`, {
        method: 'DELETE',
        credentials: 'include'
      }).then(() => {
        window.alert(`La tarea ${todo.id} se a eliminado correctamente`)
        tr.remove();
      });
  })

    // Botón de editar
    const btnEdit = document.createElement("button");
    btnEdit.style.backgroundColor = "#3182ce"; // Azul
    btnEdit.style.color = "white";
    btnEdit.style.padding = "5px";
    btnEdit.style.borderRadius = "3px";
    btnEdit.style.marginLeft = "5px";
    btnEdit.textContent = "Edit";
    btnEdit.addEventListener("click", () => {
      const newTitle = prompt("Ingrese el nuevo título:", todo.title);
      const newCompleted = confirm("¿Está completada la tarea?");

      if (newTitle !== null) {
        fetch(`http://localhost:4000/todos/${todo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: newTitle,
            completed: newCompleted
          }),
          credentials: 'include'
        }).then(response => response.json())
        .then(updatedTodo => {
          console.log(updatedTodo);
          const title = updatedTodo.title || 'Título no disponible';
          const completed = updatedTodo.completed ? "Sí" : "No";
          
          td2.textContent = title;
          td3.textContent = completed;
          window.alert(`La tarea ${todo.id} se modificó correctamente`);
        });
      }
    });

    td5.appendChild(btnDelete);
    td5.appendChild(btnEdit);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tbody.appendChild(tr);
  };

  // Añadir los botones al contenedor
  container.appendChild(btnHome);
  container.appendChild(btnCreate);

  let commonOwner = null; // Variable para almacenar el owner común

  // Cargar los todos existentes
  fetch("http://localhost:4000/todos", {
    credentials: "include"
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo, index) => {
        if (todo.id === 0) return;

        // Guardar el primer owner que se encuentre
        if (index === 0) {
          commonOwner = todo.owner;
        }

        addTodoToTable(todo);
      });
    });

  // Acción para crear un nuevo todo
  btnCreate.addEventListener("click", async () => {
    // Solicitar los datos de la nueva tarea al usuario
    const newTitle = prompt("Ingresa el título de la nueva tarea:");
    const newCompleted = confirm("¿Marcar la nueva tarea como completada?");

    // Si el usuario no cancela la acción de creación
    if (newTitle !== null) {
        try {
            // Hacer la solicitud POST al backend para crear la tarea
            const response = await fetch(`http://localhost:4000/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // Token para autenticación
                },
                body: JSON.stringify({
                    title: newTitle,        // Título de la nueva tarea
                    completed: newCompleted // Estado de completado
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // Mostrar mensaje de éxito
                // Aquí puedes actualizar la UI, por ejemplo, agregar la nueva tarea a la lista
                // const newTodoElement = document.createElement("li");
                // newTodoElement.textContent = result.newTask.title;
                // document.getElementById("todo-list").appendChild(newTodoElement);
            } else {
                alert(result.message); // Mostrar mensaje de error
            }
        } catch (error) {
            console.error("Error al crear la tarea:", error);
            alert("Hubo un error al crear la tarea");
        }
    }
});

  container.appendChild(title);
  container.appendChild(table);

  return container;
};