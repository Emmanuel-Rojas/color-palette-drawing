const colorPicker = document.getElementById('colorPicker');
const colorBox = document.getElementById('colorBox');
const colorCode = document.getElementById('colorCode');
const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Color manual
colorPicker.addEventListener('input', () => {
    const color = colorPicker.value;
    colorBox.style.backgroundColor = color;
    colorCode.textContent = `Código HEX: ${color}`;
});

// Imagen
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const img = new Image();

    reader.onload = (e) => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
});

// Clic en imagen para obtener color
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((event.clientX - rect.left) * scaleX);
    const y = Math.floor((event.clientY - rect.top) * scaleY);

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b] = pixel;

    const hex = "#" + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
    colorBox.style.backgroundColor = hex;
    colorCode.textContent = `RGB: (${r}, ${g}, ${b}) – HEX: ${hex}`;
});
