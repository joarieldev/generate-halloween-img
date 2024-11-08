interface Props {
  popupDelete: (confirm: boolean) => void;
}

export const ModalDelete = ({ popupDelete }: Props) => {
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen bg-black/70 z-20 grid place-items-center">
      <div className="flex flex-col items-center py-4 px-3 max-w-80 rounded-lg space-y-1 bg-[#FFFCF0] text-[#DC7609]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#DC7609">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 1.67c.955 0 1.845.467 2.39 1.247l.105.16 8.114 13.548a2.914 2.914 0 0 1-2.307 4.363l-.195.008H3.882a2.914 2.914 0 0 1-2.582-4.2l.099-.185 8.11-13.538A2.914 2.914 0 0 1 12 1.67zM12.01 15l-.127.007a1 1 0 0 0 0 1.986L12 17l.127-.007a1 1 0 0 0 0-1.986L12.01 15zM12 8a1 1 0 0 0-.993.883L11 9v4l.007.117a1 1 0 0 0 1.986 0L13 13V9l-.007-.117A1 1 0 0 0 12 8z" />
        </svg>
        <p>¡Estás a punto de borrar tu imagen!</p>
        <div className="flex justify-evenly pt-2 w-full">
          <button
            className="bg-[#DC7609] text-white py-1 px-2 rounded hover:contrast-125"
            onClick={() => popupDelete(true)}
          >
            Confirmar
          </button>
          <button
            className="py-1 px-2 rounded hover:contrast-125"
            onClick={() => popupDelete(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
