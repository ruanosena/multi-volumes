/* eslint-disable react-refresh/only-export-components */
import { Transportadora } from "@/lib/classes";
import { Config } from "@/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type ConfiguracoesContextType = {
  transportadoras: Transportadora[];
  addTransportadora: (transportadora: Transportadora) => void;
  updateTransportadora: (
    transportadora: Transportadora,
    updatedTransportadora: Transportadora,
  ) => void;
  removeTransportadora: (transportadora: Transportadora) => void;
  jaFoiConfigurado: boolean;
  dialogoAberto: boolean;
  setDialogoAberto: (aberto: boolean) => void;
  updateConfig: (key?: keyof Config, value?: Config[keyof Config]) => void;
};

const ConfiguracoesContext = createContext<ConfiguracoesContextType>(
  {} as ConfiguracoesContextType,
);

interface ConfiguracoesContextProviderProps {
  children: ReactNode;
  storageKey?: string;
}

export function ConfiguracoesContextProvider({
  children,
  storageKey = "@ruanosena:configuracoes-0.0.0",
}: ConfiguracoesContextProviderProps) {
  const [transportadoras, setTransportadoras] = useState<Transportadora[]>([]);
  const [jaFoiConfigurado, setJaFoiConfigurado] = useState(() => {
    if (localStorage.getItem(storageKey)) {
      try {
        const config: Config = JSON.parse(localStorage.getItem(storageKey)!);
        setTransportadoras(config.transportadoras ?? []);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  });
  const [dialogoAberto, setDialogoAberto] = useState(!jaFoiConfigurado);

  const updateConfig = useCallback(
    (key?: keyof Config, value?: Config[keyof Config]) => {
      let config: Config = {};
      try {
        const data = localStorage.getItem(storageKey);
        if (data) config = JSON.parse(data);
      } catch {
        /* empty */
      } finally {
        if (key != undefined && value != undefined) {
          config[key] = value;
        }
        localStorage.setItem(storageKey, JSON.stringify(config));
        setJaFoiConfigurado(true);
      }
    },
    [storageKey],
  );

  const addTransportadora = useCallback(
    (t: Transportadora) => {
      setTransportadoras((prevState) => {
        const transportadoras = [...prevState, t];
        updateConfig("transportadoras", transportadoras);
        return transportadoras;
      });
    },
    [updateConfig],
  );

  const updateTransportadora = useCallback(
    (toUpdate: Transportadora, updated: Transportadora) => {
      setTransportadoras((prevState) => {
        const transportadoras = prevState.map((prevT) =>
          prevT === toUpdate ? updated : prevT,
        );
        updateConfig("transportadoras", transportadoras);
        return transportadoras;
      });
    },
    [updateConfig],
  );

  const removeTransportadora = useCallback(
    (toRemove: Transportadora) => {
      setTransportadoras((prevState) => {
        const transportadoras = prevState.filter((prevT) => prevT !== toRemove);
        updateConfig("transportadoras", transportadoras);
        return transportadoras;
      });
    },
    [updateConfig],
  );

  return (
    <ConfiguracoesContext.Provider
      value={{
        transportadoras,
        addTransportadora,
        updateTransportadora,
        removeTransportadora,
        jaFoiConfigurado,
        dialogoAberto,
        setDialogoAberto,
        updateConfig,
      }}
    >
      {children}
    </ConfiguracoesContext.Provider>
  );
}

export const useConfiguracoes = () => useContext(ConfiguracoesContext);
