const tableEl = document.querySelector('#iTunesTable');
const searchEl = document.querySelector('#search-btn');
const inputEl = document.querySelector('#input-field');
const loader = document.querySelector('.load-screen');

const getingData = async (url, method = 'GET') => {
  const response = await fetch(url, {
    method: method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: method != 'GET' ? JSON.stringify(data) : null,
  });
  if (response.ok) {
    return response.json();
  }

  return response;
};

const preparingData = (dataObj) => {
  if (Array.isArray(dataObj.results) && dataObj.resultCount > 0) {
    for (const song of dataObj.results) {
      tableEl.append(
        creatingHtml(song.trackName, song.artistName, song.previewUrl)
      );
    }
  } else {
    tableEl.innerHTML = `
  <tr>
      <th class="flex-item-1">Pjesma</th>
      <th class="flex-item-2">Izvođač</th>
      <th class="flex-item-3">Reproduciraj</th>
  </tr>
  <tr>
    <td>Sorry, there is no such data!</td>
  </tr>`;
  }
};

const creatingHtml = (song, artist, preview) => {
  const rowTb = document.createElement('tr');
  rowTb.innerHTML = `<td class="songName flex-item-1">${song}</td>
        <td class="performerName flex-item-2">${artist}</td>
        <td class="playDemoBtn flex-item-3">
            <audio controls src="${preview}"></audio>
        </td>`;
  return rowTb;
};

const createListOfSongs = (e) => {
  e.preventDefault;

  if (!inputEl.value) {
    alert('Please type prefered genre of songs!');
    return;
  }

  tableEl.innerHTML = `
    <tr>
        <th class="flex-item-1">Pjesma</th>
        <th class="flex-item-2">Izvođač</th>
        <th class="flex-item-3">Reproduciraj</th>
    </tr>`;
  const inputValue = inputEl.value;
  const iTunesUrl = `https://itunes.apple.com/search?term=${inputValue}&entity=song`;

  loader.classList.add('display-loader');

  getingData(iTunesUrl)
    .then((data) => preparingData(data))
    .catch((error) => console.log(error))
    .finally(() => {
      loader.classList.remove('display-loader');
    });

  resetInput();
};

// const data = getingData(iTunesTable);
// console.log(data);

const pressEnter = (e) => {
  if (e.key === 'Enter') {
    createListOfSongs(e);
  }
};

resetInput = () => {
  inputEl.value = '';
  inputEl.focus();
};

const init = () => {
  searchEl.addEventListener('click', createListOfSongs);
  inputEl.addEventListener('keyup', pressEnter);
};

init();
