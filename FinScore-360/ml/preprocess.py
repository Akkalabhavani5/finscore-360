"""
FinScore 360 – Machine Learning Preprocessing Pipeline
Handles:
- Missing value imputation
- Categorical encoding (Gender, Married, Dependents, Education, Self_Employed, Property_Area, Credit_History)
- Numerical scaling (ApplicantIncome, CoapplicantIncome, LoanAmount, Loan_Amount_Term)
"""

import os
import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import StandardScaler

class LoanDataPreprocessor(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.scaler = StandardScaler()
        self.feature_names = [
            'ApplicantIncome',
            'CoapplicantIncome',
            'LoanAmount',
            'Loan_Amount_Term',
            'Credit_History',
            'Gender_Male',
            'Married_Yes',
            'Dependents_1',
            'Dependents_2',
            'Dependents_3+',
            'Education_Graduate',
            'Self_Employed_Yes',
            'Property_Area_Semiurban',
            'Property_Area_Urban'
        ]
        self.numerical_cols = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term']
        self.fitted_means = {}

    def fit(self, X, y=None):
        df = X.copy()
        for col in self.numerical_cols:
            if col in df:
                self.fitted_means[col] = df[col].median()
        
        # Fit scaler on imputed numerical columns
        imputed_num = df[self.numerical_cols].fillna(self.fitted_means)
        self.scaler.fit(imputed_num)
        return self

    def transform(self, X):
        df = X.copy()
        
        # Numerical imputation
        for col in self.numerical_cols:
            if col in df:
                df[col] = df[col].fillna(self.fitted_means.get(col, 0))
            else:
                df[col] = self.fitted_means.get(col, 0)
                
        # Scale numericals
        scaled_nums = self.scaler.transform(df[self.numerical_cols])
        scaled_df = pd.DataFrame(scaled_nums, columns=self.numerical_cols, index=df.index)

        # Categorical processing
        credit_history = df['Credit_History'].fillna(1.0).astype(float)
        gender_male = (df['Gender'] == 'Male').astype(float)
        married_yes = (df['Married'] == 'Yes').astype(float)
        dep_1 = (df['Dependents'].astype(str) == '1').astype(float)
        dep_2 = (df['Dependents'].astype(str) == '2').astype(float)
        dep_3 = (df['Dependents'].astype(str) == '3+').astype(float)
        edu_grad = (df['Education'] == 'Graduate').astype(float)
        self_emp = (df['Self_Employed'] == 'Yes').astype(float)
        prop_semi = (df['Property_Area'] == 'Semiurban').astype(float)
        prop_urban = (df['Property_Area'] == 'Urban').astype(float)

        processed = pd.DataFrame({
            'ApplicantIncome': scaled_df['ApplicantIncome'],
            'CoapplicantIncome': scaled_df['CoapplicantIncome'],
            'LoanAmount': scaled_df['LoanAmount'],
            'Loan_Amount_Term': scaled_df['Loan_Amount_Term'],
            'Credit_History': credit_history,
            'Gender_Male': gender_male,
            'Married_Yes': married_yes,
            'Dependents_1': dep_1,
            'Dependents_2': dep_2,
            'Dependents_3+': dep_3,
            'Education_Graduate': edu_grad,
            'Self_Employed_Yes': self_emp,
            'Property_Area_Semiurban': prop_semi,
            'Property_Area_Urban': prop_urban
        })

        return processed[self.feature_names]

def load_and_clean_data(file_path):
    """Loads raw dataset, cleans basic anomalies and saves to processed folder"""
    df = pd.read_csv(file_path)
    # Target encoding: Y -> 1, N -> 0
    if 'Loan_Status' in df.columns:
        df['Loan_Status'] = df['Loan_Status'].map({'Y': 1, 'N': 0})
    return df
