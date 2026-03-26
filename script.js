        const timetable = {
            Monday: [
                { time: "09:00-09:50", subject: "Mathematics", faculty: "Dr. Aris Rao" },
                { time: "10:00-10:50", subject: "Physics", faculty: "Prof. Sarah Mehta" },
                { time: "14:00-14:50", subject: "Data Structures", faculty: "Dr. Vikram Nair" }
            ],
            Tuesday: [
                { time: "09:00-09:50", subject: "Operating Systems", faculty: "Dr. Vikram Nair" },
                { time: "10:00-10:50", subject: "Mathematics", faculty: "Dr. Aris Rao" }
            ],
            Wednesday: [
                { time: "09:00-09:50", subject: "Database Systems", faculty: "Dr. Omar Khan" },
                { time: "11:00-11:50", subject: "Elective", faculty: "Prof. Elena Rossi" }
            ],
            Thursday: [
                { time: "10:00-10:50", subject: "English", faculty: "Mr. David Singh" },
                { time: "14:00-14:50", subject: "Seminar", faculty: "Dr. Aris Rao" }
            ],
            Friday: [
                { time: "09:00-09:50", subject: "Data Structures", faculty: "Dr. Vikram Nair" },
                { time: "12:00-12:50", subject: "Mentoring", faculty: "Prof. Elena Rossi" }
            ]
        };

        const days = Object.keys(timetable);
        let activeDay = "Monday";
        let clickedIndex = null;

        const tabsContainer = document.getElementById('tabs');
        const scheduleContainer = document.getElementById('schedule');

        function renderTabs() {
            tabsContainer.innerHTML = days.map(day => `
                <div class="tab ${day === activeDay ? 'active' : ''}" onclick="setDay('${day}')">
                    ${day}
                </div>
            `).join('');
        }

        function setDay(day) {
            activeDay = day;
            clickedIndex = null;
            renderTabs();
            renderSchedule();
        }

        function renderSchedule() {
            const periods = timetable[activeDay];
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            scheduleContainer.innerHTML = periods.map((p, i) => {
                const [start, end] = p.time.split('-').map(t => {
                    const [h, m] = t.split(':').map(Number);
                    return h * 60 + m;
                });

                const isCurrent = (currentMinutes >= start && currentMinutes < end);
                const isHighlighted = clickedIndex === i || (clickedIndex === null && isCurrent);

                return `
                    <div class="period ${isHighlighted ? 'highlight' : ''}" onclick="highlight(${i})">
                        <div class="period-info">
                            <h3>${p.subject}</h3>
                            <p>${p.faculty}</p>
                        </div>
                        <div class="period-time">${p.time}</div>
                    </div>
                `;
            }).join('');
        }

        window.highlight = (index) => {
            clickedIndex = index;
            renderSchedule();
        };

        renderTabs();
        renderSchedule();