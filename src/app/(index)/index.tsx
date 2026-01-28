import { useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import * as AC from "@bacons/apple-colors";

export default function IndexRoute() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - firstDay + 1;
      const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
      const isTodayCell = isValidDay && isToday(dayNumber);

      days.push(
        <Pressable
          key={i}
          style={{
            flex: 1,
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isTodayCell ? AC.systemBlue : "transparent",
            borderRadius: 20,
            borderCurve: "continuous",
            margin: 2,
          }}
        >
          {isValidDay && (
            <Text
              style={{
                fontSize: 16,
                color: isTodayCell ? AC.white : AC.label,
                fontWeight: isTodayCell ? "600" : "400",
              }}
            >
              {dayNumber}
            </Text>
          )}
        </Pressable>
      );
    }

    return days;
  };

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        flex: 1,
        backgroundColor: AC.systemBackground,
      }}
    >
      <View style={{ padding: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Pressable
            onPress={previousMonth}
            style={{
              padding: 8,
              backgroundColor: AC.secondarySystemBackground,
              borderRadius: 8,
              borderCurve: "continuous",
            }}
          >
            <Text style={{ fontSize: 20, color: AC.systemBlue }}>←</Text>
          </Pressable>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: AC.label,
            }}
          >
            {monthName}
          </Text>
          <Pressable
            onPress={nextMonth}
            style={{
              padding: 8,
              backgroundColor: AC.secondarySystemBackground,
              borderRadius: 8,
              borderCurve: "continuous",
            }}
          >
            <Text style={{ fontSize: 20, color: AC.systemBlue }}>→</Text>
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor: AC.secondarySystemBackground,
            borderRadius: 16,
            borderCurve: "continuous",
            padding: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 8,
            }}
          >
            {weekDays.map((day, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: AC.secondaryLabel,
                  }}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {renderCalendarDays()}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
