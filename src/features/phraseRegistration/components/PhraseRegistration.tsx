import React from "react";
//import { google, GaxiosResponse } from "googleapis";
import { Text, Grid, GridItem, HStack, CloseButton } from "@chakra-ui/react";

const PhraseRegistration: React.FC<{ onEnd: () => void }> = ({ onEnd }) => {
  /*
  const [drive, setDrive] = useState<any | null>(null);
  const [authUrl, setAuthUrl] = useState<string | null>(null); // 認証URLを保持するステート

  useEffect(() => {
    const fetchData = async () => {
      const authClient = await initGoogleDriveApiClient();
      if (authClient) {
        // Google Drive APIクライアントを初期化
        const drive = google.drive({ version: "v3", auth: authClient });

        // ここでGoogle Drive APIを使ってファイル一覧などの操作を行います
        const response: GaxiosResponse = await drive.files.list({});
        console.log(response.data);
      }
    };
    fetchData();
  }, []);

  // ドライブのファイル一覧を取得する関数
  const listFiles = async () => {
    if (!drive) {
      console.error("Google Drive APIクライアントが初期化されていません。");
      return;
    }
    // ここでファイル一覧を取得する処理を実装します
  };
  */
  return (
    <>
      <Grid
        templateAreas={`"registration-header"
                  "registration-main"`}
        gridTemplateRows={"20px 1fr"}
        gridTemplateColumns={"1fr"}
        gap="0"
        color="blackAlpha.700"
        fontWeight="bold"
      ></Grid>
      <GridItem pl="0" bg="orange.300" area={"registration-header"}>
        <HStack>
          <CloseButton
            onClick={() => onEnd()}
            size="sm"
            variant="solid"
            bgColor="white"
          />
          <Text>フレーズ登録</Text>
        </HStack>
      </GridItem>
      <GridItem pl="0" bg="orange.300" area={"registration-main"}></GridItem>
    </>
  );
};

export default PhraseRegistration;
