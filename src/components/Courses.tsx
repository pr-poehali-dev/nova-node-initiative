const courses = [
  {
    title: "Начальный",
    subtitle: "Для новичков",
    price: "3 500 ₽",
    period: "в месяц",
    features: [
      "2 занятия в неделю",
      "Постановка голоса",
      "Основы нотной грамоты",
      "Введение в церковные напевы",
    ],
    highlighted: false,
  },
  {
    title: "Основной",
    subtitle: "Самый популярный",
    price: "6 000 ₽",
    period: "в месяц",
    features: [
      "3 занятия в неделю",
      "Работа с дыханием и дикцией",
      "Знаменный и Byzantine напев",
      "Пение в ансамбле",
      "Участие в богослужениях",
    ],
    highlighted: true,
  },
  {
    title: "Регентский",
    subtitle: "Для опытных певчих",
    price: "9 500 ₽",
    period: "в месяц",
    features: [
      "Индивидуальные занятия",
      "Управление хором",
      "Церковный устав и типикон",
      "Гармония и аранжировка",
      "Стажировка при храме",
    ],
    highlighted: false,
  },
];

export default function Courses() {
  return (
    <div id="courses" className="bg-neutral-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-neutral-500 text-sm tracking-wide mb-4">Обучение</p>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-16 leading-tight max-w-xl">
          Курсы и расценки
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.title}
              className={`flex flex-col p-8 border transition-all duration-300 ${
                course.highlighted
                  ? "border-white bg-white text-neutral-900"
                  : "border-neutral-700 text-white hover:border-neutral-400"
              }`}
            >
              <p className={`uppercase text-xs tracking-wide mb-2 ${course.highlighted ? "text-neutral-500" : "text-neutral-500"}`}>
                {course.subtitle}
              </p>
              <h3 className="text-2xl font-bold mb-6">{course.title}</h3>
              <div className="mb-8">
                <span className="text-4xl font-bold">{course.price}</span>
                <span className={`text-sm ml-2 ${course.highlighted ? "text-neutral-500" : "text-neutral-400"}`}>{course.period}</span>
              </div>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {course.features.map((f) => (
                  <li key={f} className={`text-sm flex gap-2 items-start ${course.highlighted ? "text-neutral-700" : "text-neutral-300"}`}>
                    <span className="mt-0.5">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 text-sm uppercase tracking-wide border transition-all duration-300 ${
                  course.highlighted
                    ? "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-700"
                    : "bg-transparent text-white border-neutral-600 hover:border-white"
                }`}
              >
                Записаться
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
