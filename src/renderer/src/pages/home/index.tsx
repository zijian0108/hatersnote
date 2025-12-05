import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import styles from "./index.module.scss";

export const PageHome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className={styles["page-home"]}>
      <button onClick={handleLogin}>{t("page.home.title")}</button>
    </div>
  );
};
