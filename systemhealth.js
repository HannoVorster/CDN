// Table
/*
    Parameters:
    tableElement: The element of the table, this can be and ID or class.
    data: The data received from the server side

    The table expects an array[] of objects.
    The object should look as follow:
    {
        Name: string,
        DeviceId: string,
        DeviceType: string,
        LastMessage: date|string,
        Lqi: int,
        Battery: double
    }
*/
const table = (tableElement, data) => {
  $(`${tableElement} thead`).append(`<tr class="fw-bold fs-6 text-muted">
                                            <th class="text-center">Name</th>
                                            <th class="text-center">Device ID</th>
                                            <th class="text-center">Device Type</th>
                                            <th class="text-center">Last Message</th>
                                            <th class="text-center">Signal Strength</th>
                                            <th class="text-center">Battery</th>
                                            <th clss="text-center">Status</th>
                                        </tr>`);

  if (data.length > 0) {
    data.forEach((device) => {
      var lqi = "No Data";
      var battery = "No Data";

      // Signal Strength
      switch (device.Lqi) {
        case 3:
          lqi = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-reception-4" viewBox="0 0 16 16">
                            <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-8zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-11z"/>
                          </svg>`;
          break;
        case 2:
          lqi = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-reception-3" viewBox="0 0 16 16">
                            <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-8zm4 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                          </svg>`;
          break;

        case 1:
          lqi = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="orange" class="bi bi-reception-2" viewBox="0 0 16 16">
                            <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4 5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                          </svg>`;
          break;

        case 0:
          lqi = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-reception-1" viewBox="0 0 16 16">
                            <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                          </svg>`;
          break;

        default:
          lqi = "No Data";
      }

      // If above full voltage
      if (device.Battery > 3.6) device.Battery = 3.6;
      if (device.Battery < 0) device.Battery = 0;

      // Battery Icon
      if (device.Battery <= 3.6 && device.Battery > 3) {
        battery = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="25" height="25" fill="green">
                        <path d="M0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176zm80-16c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zm368 32V320H96V192H448z"/>
                    </svg>`;
      } else if (device.Battery <= 3 && device.Battery > 2.4) {
        battery = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="25" height="25" fill="green">
                        <path d="M0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176zm80-16c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zm272 32V320H96V192H352z"/>
                    </svg>`;
      } else if (device.Battery <= 2.4 && device.Battery > 1.8) {
        battery = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="25" height="25" fill="orange">
                        <path d="M0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176zm80-16c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zm208 32V320H96V192H288z"/>
                    </svg>`;
      } else if (device.Battery <= 1.8 && device.Battery > 1.2) {
        battery = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="25" height="25" fill="red">
                        <path d="M0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176zm80-16c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zm112 32V320H96V192h96z"/>
                    </svg>`;
      } else if (device.Battery <= 1.8 && device.Battery > 1.2) {
        battery = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="25" height="25" fill="red">
                        <path d="M0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176zm80-16c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zm112 32V320H96V192h96z"/>
                    </svg>`;
      } else if (device.Battery <= 1.2 && device.Battery > 0.6) {
        battery = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="25" height="25" fill="red">
                        <path d="M80 96C35.8 96 0 131.8 0 176V336c0 44.2 35.8 80 80 80H464c44.2 0 80-35.8 80-80V320c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32V176c0-44.2-35.8-80-80-80H80zM64 176c0-8.8 7.2-16 16-16H464c8.8 0 16 7.2 16 16V336c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V176z"/>
                    </svg>`;
      } else if (device.Battery <= 0.6) {
        battery = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="25" height="25" fill="red">
                        <path d="M80 96C35.8 96 0 131.8 0 176V336c0 44.2 35.8 80 80 80H464c44.2 0 80-35.8 80-80V320c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32V176c0-44.2-35.8-80-80-80H80zM64 176c0-8.8 7.2-16 16-16H464c8.8 0 16 7.2 16 16V336c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V176z"/>
                    </svg>`;
      }

      $(`${tableElement} tbody`).append(` <tr>
                                                    <td class="text-center">${device.Name}</td>
                                                    <td class="text-center">${device.DeviceId}</td>
                                                    <td class="text-center">${device.DeviceType}</td>
                                                    <td class="text-center">${device.LastMessage !== null ? moment(device.LastMessage).format("YYYY-MM-DD HH:mm") : "No Data"}</td>
                                                    <td class="text-center">${lqi}</td>
                                                    <td class="text-center">${battery}</td>
                                                    <td class="text-center">${
                                                      moment.duration(moment().diff(moment(device.LastMessage))).asMinutes() < 62
                                                        ? "<span style='color: green'><b>Online</b></span>"
                                                        : "<span style='color: red'><b>Offline</b></span>"
                                                    }</td>
                                                </tr>`);
    });

    $(`${tableElement}`).DataTable({
      dom: "<'row'<'col-sm-6 d-flex align-items-center justify-content-start'f><'col-sm-6 d-flex align-items-center justify-content-end'p>><'table-responsive'tr>",
      scrollX: false,
      ordering: true,
      order: [[3, "asc"]],
      destroy: true,
    });
  } else {
    $(`${tableElement} tbody`).append(`<tr><td colspan="7" class="text-center"><b>No Data</b></td></tr>`);
  }
};

// Add all functions in an object
const SystemHealth = {
  table: table,
};
