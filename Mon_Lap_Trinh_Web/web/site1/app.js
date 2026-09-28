const result = document.getElementById('result');
const statusText = document.getElementById('status');
const button = document.getElementById('btnApi');

async function callApi() {
  button.disabled = true;
  statusText.textContent = 'Đang gọi API...';
  try {
    const response = await fetch('/api/tacke?amount=120000');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    result.textContent = JSON.stringify(data, null, 2);
    statusText.textContent = 'Gọi API thành công';
  } catch (error) {
    result.textContent = `Lỗi: ${error.message}`;
    statusText.textContent = 'Không thể kết nối API';
  } finally {
    button.disabled = false;
  }
}

button.addEventListener('click', callApi);
