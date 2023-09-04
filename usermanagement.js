const userTable = (tableElement, data) => {
  $(`${tableElement} thead`).append(`
    <tr class="fw-bold fs-6 text-muted">
      <th class="text-center">Name</th>
      <th class="text-center">Surname</th>
      <th class="text-center">Email Address</th>
      <th class="text-center">Role</th>
      <th class="text-center">Account Activated</th>
      <th class="text-center"></th>
    </tr>`);

  data.forEach((user) => {
    $(`${tableElement} tbody`).append(`
      <tr>
        <td class="text-center">${user.Name}</td>
        <td class="text-center">${user.Surname}</td>
        <td class="text-center">${user.EmailAddress}</td>
        <td class="text-center">${user.Role}</td>
        <td class="text-center">${user.AccountActivated == true ? "<span style='color: green;'>Yes</span>" : "<span style='color: red;'>No</span>"}</td>
        <td>
            <div class="d-grid gap-2 d-md-block">
                <button class="btn btn-outline-primary delete" id="${user.Id}">Delete</button>
                <button class="btn btn-outline-primary edit" id="${user.Id}">Edit</button>
                ${user.AccountActivated == false ? '<button class="btn btn-outline-primary resend-email" id="' + user.Id + '">Resend Email</button>' : ""}
            </div>
        </td>
      </tr>`);
  });

  $(tableElement).DataTable({
    dom: "<'row'<'col-sm-6 d-flex align-items-center justify-content-start'f><'col-sm-6 d-flex align-items-center justify-content-end'p>><'table-responsive'tr>",
    scrollX: false,
    ordering: true,
    destroy: true,
  });
};

// Add all functions in an object
const UserManagement = {
  table: userTable,
};
