import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { store } from "../store/store";
import client from "../graphql/client";
import TaskForm from "./TaskForm";
import "@testing-library/jest-dom";




const renderWithProviders = (ui) => {
    return render(
        <ApolloProvider client={client}>
            <Provider store={store}>{ui}</Provider>
        </ApolloProvider>
    );
};

describe("TaskForm", () => {
    it("should render the form", () => {
        renderWithProviders(<TaskForm />);
        const formElement = screen.getByRole("form");
        expect(formElement).toBeInTheDocument();
    });

});
