import React, { useEffect, useState } from "react";
import { Box, Typography, styled, Button, Dialog } from "@material-ui/core";
import { Formik, Form } from "formik";
import { ShareValidationSchema } from "../utility/validations/signUpValidation.ts";
import CustomTextField from "./CustomTextField.tsx";
import { StockInitialValue } from "../utility/interfaces/IRoute.ts";
import StockApi from "../service/stock-service.ts";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  id?: number | null | undefined;
  onSave?: () => void;
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const { open, onClose, id, onSave } = props;
  const [stockData, setStockData] = useState<StockInitialValue>({});
  const initialValue: StockInitialValue = {
    name: stockData?.name,
    current_price: stockData?.current_price,
  };

  const handleSubmit = async (values, { resetForm }) => {
    const data = {
      id: props.id,
      name: values.name,
      current_price: values.current_price,
    };
    if (props.id) {
      await StockApi.editStock(data);
      onSave?.();
    } else {
      await StockApi.addNewStock(data);
      onSave?.();
    }
  };
  const handleClose = () => {
    onClose();
  };

  const fetchData = async (id: number) => {
    const result = await StockApi.getStockById(id);
    setStockData(result?.data?.data[0]);
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const errorHyperTextStyle = {
    marginLeft: "-10px",
    marginTop: "0px",
    marginBottom: "-12px",
    color: "red",
    lineHeight: 1,
  };
  const StyledDialog = styled(Dialog)({
    "& .MuiPaper-root": {
      width: "50vw",
      maxWidth: "900px",
      margin: "auto",
    },
    width: "100%",
    margin: "auto",
  });
  const MainBox = styled(Box)({
    padding: "20px",
  });
  const HeaderTypography = styled(Typography)({
    fontWeight: "bold",
    marginBottom: "20px",
  });
  const MainForm = styled(Form)({
    width: "100%",
  });
  const ButtonBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  });
  const SaveButton = styled(Button)({
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "10px",
    textTransform: "capitalize",
  });
  const CancelButton = styled(Button)({
    marginTop: "10px",
    marginBottom: "10px",
    textTransform: "capitalize",
  });

  return (
    <StyledDialog
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="lg"
    >
      <MainBox>
        <HeaderTypography variant="h5">
          {id ? "Update Stock" : "Add New Stock"}
        </HeaderTypography>
        <Formik
          initialValues={initialValue}
          enableReinitialize
          validationSchema={ShareValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <MainForm onSubmit={handleSubmit}>
              <CustomTextField
                label="Name"
                name="name"
                id="name"
                placeholder="Enter Share name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.name && !!errors.name}
                helperText={errors.name}
                touched={touched}
                errors={errors}
                errorHyperTextStyle={errorHyperTextStyle}
              />
              <CustomTextField
                label="Price"
                name="current_price"
                id="current_price"
                type="number"
                placeholder="Enter share price"
                value={values.current_price}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.current_price && !!errors.current_price}
                helperText={errors.current_price}
                touched={touched}
                errors={errors}
                errorHyperTextStyle={errorHyperTextStyle}
              />
              <ButtonBox>
                <SaveButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={
                    !!Object.keys(errors).length ||
                    !values.name ||
                    !values.current_price
                  }
                >
                  Save
                </SaveButton>
                <CancelButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleClose}
                >
                  Cancel
                </CancelButton>
              </ButtonBox>
            </MainForm>
          )}
        </Formik>
      </MainBox>
    </StyledDialog>
  );
}
