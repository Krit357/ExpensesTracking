import { StyleSheet, Text, View, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) {
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangedHandeler(inputIdentifier, enteredValue) {
    setInput((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandeler() {
    const expensesData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };

    const amountISValid =
      !isNaN(expensesData.amount) && expensesData.amount > 0;
    const dateIsValid = expensesData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expensesData.description.trim().length > 0;

    if (!amountISValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid Input", "Please check your input values");
      setInput(() => {
        return {
          amount: { value: input.amount.value, isValid: amountISValid },
          date: { value: input.date.value, isValid: dateIsValid },
          description: {
            value: input.description.value,
            isValid: descriptionIsValid,
          },
        };
      });

      return;
    }
    onSubmit(expensesData);
  }

  const formIsInValid =
    input.amount.isValid || !input.date.isValid || !input.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.subContainer}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!input.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandeler.bind(this, "amount"),
            value: input.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!input.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandeler.bind(this, "date"),
            value: input.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!input.description.isValid}
        textInputConfig={{
          keyboardType: "default",
          multiline: true,
          //   autoCorrect: false,
          //   autoCapitalize: "words",
          onChangeText: inputChangedHandeler.bind(this, "description"),
          value: input.description.value,
        }}
      />

      {formIsInValid && (
        <Text style={styles.errorText}>
          Invalid input values,Check your data
        </Text>
      )}

      <View style={styles.containerButton}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandeler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  button: {
    minWidth: 120,
    marginBottom: 8,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
