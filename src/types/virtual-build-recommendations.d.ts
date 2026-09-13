declare module "virtual:build-recommendations" {
  const buildFiles: Array<{
    fileName: string;
    data: unknown;
  }>;

  export default buildFiles;
}
