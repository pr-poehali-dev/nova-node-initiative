export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/9ff1c471-31a9-45a2-8945-ddb1cbbefd1b/files/bf36a182-3b19-4d0e-9ca9-a2baa66ed247.jpg"
          alt="Занятие в школе церковного песнопения"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">Почему наша школа</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Мы учим не просто петь — мы учим молиться голосом. Живые занятия с опытными регентами, работа с дыханием, постановка голоса и глубокое погружение в традицию церковного пения.
        </p>
        <button className="bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide">
          Записаться на занятие
        </button>
      </div>
    </div>
  );
}