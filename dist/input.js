let input_dir = { x: 0, y: 0 };
let last_moving_dir = { x: 0, y: 0 };
window.addEventListener('keypress', (e) => {
    switch (e.key.toLowerCase()) {
        case 'w': {
            if (last_moving_dir.y !== 0)
                break;
            input_dir = { x: 0, y: -1 };
            break;
        }
        case 's': {
            if (last_moving_dir.y !== 0)
                break;
            input_dir = { x: 0, y: 1 };
            break;
        }
        case 'a': {
            if (last_moving_dir.x !== 0)
                break;
            input_dir = { x: -1, y: 0 };
            break;
        }
        case 'd': {
            if (last_moving_dir.x !== 0)
                break;
            input_dir = { x: 1, y: 0 };
            break;
        }
    }
});
export function get_input_direction() {
    last_moving_dir = input_dir;
    return input_dir;
}
