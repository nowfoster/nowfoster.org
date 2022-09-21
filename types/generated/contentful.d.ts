// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IQuestionFields {
  /** Question */
  question: string;

  /** Hint */
  hint?: Document | undefined;

  /** Select multiple answers? */
  multiple: boolean;

  /** Options */
  options: string[];

  /** Suggestion */
  suggestion?: ISuggestion | undefined;
}

/** One "step" or question in the quiz. Grouped into sections. */

export interface IQuestion extends Entry<IQuestionFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "question";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IQuizSectionFields {
  /** Title */
  title: string;

  /** Intro */
  intro?: Document | undefined;

  /** Questions */
  questions: IQuestion[];
}

/** A group of questions in the quiz */

export interface IQuizSection extends Entry<IQuizSectionFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "quizSection";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ISuggestionFields {
  /** Title */
  title?: string | undefined;

  /** Content */
  content?: Document | undefined;
}

/** Appears alongside the active quiz question to add context and aid understanding. */

export interface ISuggestion extends Entry<ISuggestionFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "suggestion";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE = "question" | "quizSection" | "suggestion";

export type LOCALE_CODE = "en-GB";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-GB";
