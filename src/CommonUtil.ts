class CommonUtil {
    public shortenAddress(address: string) {
        return `${address.substring(0, 6)}...${address.substring(38)}`
    }
}

export default new CommonUtil();
