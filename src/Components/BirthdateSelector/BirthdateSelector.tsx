import React, { useState } from "react";
import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Grid,
    SelectChangeEvent,
} from "@mui/material";

interface Birthdate {
    day: number | undefined;
    month: number | undefined;
    year: number | undefined;
}

const BirthdateSelector: React.FC = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const [birthdate, setBirthdate] = useState<Birthdate>({
        day: undefined,
        month: undefined,
        year: undefined,
    });

    const daysInMonth = (
        month: number | undefined,
        year: number | undefined
    ) => {
        return !month || !year ? 31 : new Date(year, month, 0).getDate();
    };

    const handleDayChange = (event: SelectChangeEvent<number>) => {
        const selectedDay = event.target.value as number;
        if (
            birthdate.year &&
            birthdate.year >= currentYear &&
            birthdate.month &&
            birthdate.month > currentMonth
        ) {
            setBirthdate({
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
            setBirthdate({
                ...birthdate,
                year: currentYear - 1,
                day: (selectedDay > maxDay) ? maxDay : selectedDay,
            });
        } else {
            setBirthdate({
                ...birthdate,
                day: selectedDay,
            });
        }
    };

    const handleMonthChange = (event: SelectChangeEvent<number>) => {
        const selectedMonth = event.target.value as number;
        const maxDay = daysInMonth(selectedMonth, birthdate.year);
        if (
            birthdate.year &&
            birthdate.year >= currentYear &&
            selectedMonth > currentMonth
        ) {
            if (birthdate.day) {
                setBirthdate({
                    ...birthdate,
                    month: selectedMonth,
                    year: currentYear - 1,
                    day: birthdate.day > maxDay ? maxDay : birthdate.day,
                });
            } else {
                setBirthdate({
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
            setBirthdate({
                ...birthdate,
                day: currentDay,
                month: selectedMonth,
                year: currentYear - 1,
            });
        } else if (birthdate.day && birthdate.day > maxDay) {
            setBirthdate({
                ...birthdate,
                day: maxDay,
                month: selectedMonth,
            });
        } else {
            setBirthdate({
                ...birthdate,
                month: selectedMonth,
            });
        }
    };

    const handleYearChange = (event: SelectChangeEvent<number>) => {
        const selectedYear = event.target.value as number;
        const maxDay = daysInMonth(birthdate.month, selectedYear);
        if (
            selectedYear >= currentYear &&
            birthdate.month &&
            birthdate.month >= currentMonth &&
            birthdate.day &&
            birthdate.day > currentDay
        ) {
            setBirthdate({
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
            setBirthdate({
                ...birthdate,
                month: currentMonth,
                year: selectedYear,
            });
        } else if (birthdate.day && birthdate.day > maxDay) {
            setBirthdate({
                ...birthdate,
                day: maxDay,
                year: selectedYear,
            });
        } else {
            setBirthdate({
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
                    <InputLabel>Day</InputLabel>
                    <Select
                        value={birthdate.day ? birthdate.day : ""}
                        onChange={handleDayChange}
                    >
                        {renderDays()}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Month</InputLabel>
                    <Select
                        value={birthdate.month ? birthdate.month : ""}
                        onChange={handleMonthChange}
                    >
                        {renderMonths()}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Year</InputLabel>
                    <Select
                        value={birthdate.year ? birthdate.year : ""}
                        onChange={handleYearChange}
                    >
                        {renderYears()}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default BirthdateSelector;
