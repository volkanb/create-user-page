import React, { Dispatch, SetStateAction } from "react";
import { MenuItem, FormControl, Grid, TextField } from "@mui/material";

interface Birthdate {
    day: number | undefined;
    month: number | undefined;
    year: number | undefined;
}

interface IBirthdateSelectorProps {
    birthdate: Birthdate,
    setBirthdateCallback: ({ day, month, year }: Birthdate) => void,
    isBirthdateInvalid: boolean,
    setIsBirthdateInvalidCallback: Dispatch<SetStateAction<boolean>>,
}

const BirthdateSelector: React.FC<IBirthdateSelectorProps> = ({
    birthdate,
    setBirthdateCallback,
    isBirthdateInvalid,
    setIsBirthdateInvalidCallback,
}: IBirthdateSelectorProps) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const daysInMonth = (
        month: number | undefined,
        year: number | undefined
    ) => {
        return !month || !year ? 31 : new Date(year, month, 0).getDate();
    };

    const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDay = parseInt(event.target.value);
        if (
            birthdate.year &&
            birthdate.year >= currentYear &&
            birthdate.month &&
            birthdate.month > currentMonth
        ) {
            setBirthdateCallback({
                ...birthdate,
                year: currentYear - 1,
                day: selectedDay,
            });
        } else if (
            birthdate.year &&
            birthdate.year >= currentYear &&
            birthdate.month &&
            birthdate.month === currentMonth &&
            selectedDay > currentDay
        ) {
            const maxDay = daysInMonth(birthdate.month, currentYear - 1);
            setBirthdateCallback({
                ...birthdate,
                year: currentYear - 1,
                day: selectedDay > maxDay ? maxDay : selectedDay,
            });
        } else {
            setBirthdateCallback({
                ...birthdate,
                day: selectedDay,
            });
        }
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedMonth = parseInt(event.target.value);
        const maxDay = daysInMonth(selectedMonth, birthdate.year);
        if (
            birthdate.year &&
            birthdate.year >= currentYear &&
            selectedMonth > currentMonth
        ) {
            if (birthdate.day) {
                setBirthdateCallback({
                    ...birthdate,
                    month: selectedMonth,
                    year: currentYear - 1,
                    day: birthdate.day > maxDay ? maxDay : birthdate.day,
                });
            } else {
                setBirthdateCallback({
                    ...birthdate,
                    month: selectedMonth,
                    year: currentYear - 1,
                });
            }
        } else if (
            birthdate.year &&
            birthdate.year >= currentYear &&
            selectedMonth === currentMonth &&
            birthdate.day &&
            birthdate.day > currentDay
        ) {
            setBirthdateCallback({
                ...birthdate,
                day: currentDay,
                month: selectedMonth,
                year: currentYear - 1,
            });
        } else if (birthdate.day && birthdate.day > maxDay) {
            setBirthdateCallback({
                ...birthdate,
                day: maxDay,
                month: selectedMonth,
            });
        } else {
            setBirthdateCallback({
                ...birthdate,
                month: selectedMonth,
            });
        }
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedYear = parseInt(event.target.value);
        const maxDay = daysInMonth(birthdate.month, selectedYear);
        if (
            selectedYear >= currentYear &&
            birthdate.month &&
            birthdate.month >= currentMonth &&
            birthdate.day &&
            birthdate.day > currentDay
        ) {
            setBirthdateCallback({
                ...birthdate,
                day: currentDay,
                month: currentMonth,
                year: selectedYear,
            });
        } else if (
            selectedYear >= currentYear &&
            birthdate.month &&
            birthdate.month > currentMonth
        ) {
            setBirthdateCallback({
                ...birthdate,
                month: currentMonth,
                year: selectedYear,
            });
        } else if (birthdate.day && birthdate.day > maxDay) {
            setBirthdateCallback({
                ...birthdate,
                day: maxDay,
                year: selectedYear,
            });
        } else {
            setBirthdateCallback({
                ...birthdate,
                year: selectedYear,
            });
        }
    };

    const renderDays = () => {
        const days = [];
        let maxDay = daysInMonth(birthdate.month, birthdate.year);
        for (let i = 1; i <= maxDay; i++) {
            days.push(
                <MenuItem key={i} value={i}>
                    {i}
                </MenuItem>
            );
        }
        return days;
    };

    const renderMonths = () => {
        const months = [];
        for (let i = 1; i <= 12; i++) {
            months.push(
                <MenuItem key={i} value={i}>
                    {i}
                </MenuItem>
            );
        }
        return months;
    };

    const renderYears = () => {
        const years = [];
        for (let i = currentYear; i >= currentYear - 100; i--) {
            years.push(
                <MenuItem key={i} value={i}>
                    {i}
                </MenuItem>
            );
        }
        return years;
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <TextField
                        select
                        label="Day*"
                        name="day"
                        value={birthdate.day ? birthdate.day : ""}
                        onChange={handleDayChange}
                        error={isBirthdateInvalid}
                        helperText={isBirthdateInvalid && "Required!"}
                        onFocus={() => (
                            setIsBirthdateInvalidCallback(false)
                        )}
                    >
                        {renderDays()}
                    </TextField>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <TextField
                        select
                        label="Month*"
                        name="month"
                        value={birthdate.month ? birthdate.month : ""}
                        onChange={handleMonthChange}
                        error={isBirthdateInvalid}
                        helperText={isBirthdateInvalid && "Required!"}
                        onFocus={() => (
                            setIsBirthdateInvalidCallback(false)
                        )}
                    >
                        {renderMonths()}
                    </TextField>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <TextField
                        select
                        label="Year*"
                        name="year"
                        value={birthdate.year ? birthdate.year : ""}
                        onChange={handleYearChange}
                        error={isBirthdateInvalid}
                        helperText={isBirthdateInvalid && "Required!"}
                        onFocus={() => (
                            setIsBirthdateInvalidCallback(false)
                        )}
                    >
                        {renderYears()}
                    </TextField>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default BirthdateSelector;
